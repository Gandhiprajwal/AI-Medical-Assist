require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { spawn } = require("child_process");
const cors = require("cors");
const healthPredictRouter = require("./Routes/healthPredict.js");
const PORT = 3000;
// const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
// app.use(express.json());

// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// Ensure correct paths to AI models
const heartModel = "D:\\AI-MedLab\\backend\\aimodels\\heart.pkl";
const liverModel = "D:\\AI-MedLab\\backend\\aimodels\\liver.pkl";
const dengueModel = "D:\\AI-MedLab\\backend\\aimodels\\dengue.pkl";
const skinModel = "D:\\AI-MedLab\\backend\\aimodels\\skin.pkl";

const pythonScriptPathForLiver = path.resolve(__dirname, "liver.py");
const pythonScriptPathForHeart = path.resolve(__dirname, "heart.py");
const pythonScriptPathForDengue = path.resolve(__dirname, "dengue.py");
const pythonScriptPathForSkin = path.resolve(__dirname, "skin.py");

// Try using a virtual environment, else fallback to system Python
let PYTHON_PATH = "D:\\AI-MedLab\\venv\\Scripts\\python.exe"; // Virtual environment
const GLOBAL_PYTHON_PATH = "python"; // Use system Python as a fallback
// exports.module = { pythonScriptPathForLiver, liverModel,PYTHON_PATH };

// Check if Python executable exists
const fs = require("fs");
const { default: router } = require("./Routes/healthPredict");
if (!fs.existsSync(PYTHON_PATH)) {
  console.warn(
    "⚠️ Virtual environment not found, using system Python instead."
  );
  PYTHON_PATH = GLOBAL_PYTHON_PATH;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allows sending cookies/auth tokens
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);
app.set("io", io);

// Mongoose Connection
mongoose = require("./db/dbConfig");

// Routes
const authRoutes = require("./Routes/auth");
// const aiRoutes = require("./Routes/aiModesRoute");
// app.use("/api/v1",aiRoutes);
app.use("/api/v2/auth", authRoutes);
// Routes
app.use("/api/v3/appointments", require("./Routes/appointmentRoutes"));
app.use("/api/v4/doctors", require("./Routes/doctorRoute")); // doctor routes for availability

// Socket connection
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

require("./cron/reminderCron");

// Function to handle AI model predictions -- Liver
const runPythonScript = (res, scriptPath, modelPath, inputData) => {
  try {
    if (!inputData) {
      return res.status(400).json({ error: "Missing input data" });
    }
    // console.log(inputData);

    const pythonProcess = spawn(PYTHON_PATH, [
      scriptPath,
      "--loads",
      modelPath,
      JSON.stringify(inputData),
    ]);

    let prediction = "";
    let responseSent = false; // Track if response has been sent

    pythonProcess.stdout.on("data", (data) => {
      console.log("Python script output:", data.toString());
      prediction += data.toString().trim();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Python script error:", data.toString());
      if (!responseSent) {
        res.status(500).json({ error: data.toString() });
        responseSent = true;
      }
    });

    pythonProcess.on("close", (code) => {
      console.log("Python process closed with code:", code);
      if (!responseSent) {
        try {
          const formattedPrediction = JSON.parse(
            prediction.replace(/\[|\]/g, "")
          );
          res.json({ prediction: formattedPrediction });
        } catch (error) {
          res.json({ prediction });
        }
        responseSent = true;
      }
    });

    pythonProcess.on("error", (error) => {
      console.error("Python process error:", error);
      if (!responseSent) {
        res.status(500).send("Internal Server Error");
        responseSent = true;
      }
    });
  } catch (error) {
    console.error("Error:", error);
    if (!responseSent) {
      res.status(500).send("Internal Server Error");
      responseSent = true;
    }
  }
};

// Route for Liver Prediction 🟢🟢
app.post("/api/v1/liver", (req, res) => {
  // console.log("Received liver request with data:", req.body);
  const inputData = req.body;
  // Transform the data
  const formattedData = {
    Age: Number(inputData.age),
    Gender: inputData.gender === "0" ? "Female" : "Male",
    TB: parseFloat(inputData.totalBilirubin),
    DB: parseFloat(inputData.directBilirubin),
    Alkphos: parseInt(inputData.alkalinePhosphotase),
    Sgpt: parseInt(inputData.alamineAminotransferase),
    Sgot: parseInt(inputData.aspartateAminotransferase),
    TP: parseFloat(inputData.totalProteins),
    ALB: parseFloat(inputData.albumin),
    "A/G Ratio": parseFloat(inputData.albuminGlobulinRatio),
  };
  console.log(formattedData);
  runPythonScript(res, pythonScriptPathForLiver, liverModel, formattedData);
});

// heart api
app.post("/api/v1/heart", (req, res) => {
  const inputData = req.body; // Extract JSON input from request

  if (!inputData) {
    return res.status(400).json({ error: "No input data provided" });
  }

  // Convert frontend data to required format
  const formattedData = {
    Age: parseInt(req.body.age, 10),
    Gender: req.body.gender.toLowerCase() === "male" ? 1 : 0, // Assuming 1 for male, 0 for female
    "Heart rate": parseInt(req.body.heartRate, 10),
    "Systolic blood pressure": parseInt(req.body.systolicBP, 10),
    "Diastolic blood pressure": parseInt(req.body.diastolicBP, 10),
    "Blood sugar": parseInt(req.body.bloodSugar, 10),
    "CK-MB": parseInt(req.body.ckmb, 10),
    Troponin: parseFloat(req.body.troponin),
  };

  // Convert to JSON string
  const jsonString = JSON.stringify(formattedData);

  // Spawn Python process
  const pythonProcess = spawn("python", ["heart.py", jsonString]);

  let result = "";
  let error = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    error += data.toString();
  });

  pythonProcess.on("close", (code) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      try {
        const parsedResult = JSON.parse(result);
        res.json(parsedResult);
      } catch (parseError) {
        res.status(500).json({ error: "Invalid response from Python" });
      }
    }
  });
});

// Route for Dengue Prediction
app.post("/api/v1/dengue", (req, res) => {
  const inputData = req.body; // Extract JSON input from request
  if (!inputData) {
    return res.status(400).json({ error: "No input data provided" });
  }
  // Convert frontend data to required format
  
  console.log("Received dengue request with data:", req.body);
  runPythonScript(res, pythonScriptPathForDengue, dengueModel, req.body);
});
app.post('/predict', (req, res) => {
  const inputData = req.body;

  // Spawn Python process
  const python = spawn('python3', ['dengue.py', JSON.stringify(inputData)]);

  let output = '';
  let errorOutput = '';

  python.stdout.on('data', (data) => {
      output += data.toString();
  });

  python.stderr.on('data', (data) => {
      errorOutput += data.toString();
  });

  python.on('close', (code) => {
      try {
          const jsonOutput = JSON.parse(output.trim());
          res.json(jsonOutput);
      } catch (err) {
          res.status(500).json({
              error: 'Failed to parse Python script output',
              details: errorOutput || output
          });
      }
  });
});

// Route for Skin Disease Prediction

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
