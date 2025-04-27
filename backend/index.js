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
const multer = require("multer");
const { PythonShell } = require("python-shell");
const helmet = require("helmet");
const logRequest = require("./middleware/loggerMiddleware.js");
const {Sentry,Handlers} = require('./utils/sentry.js');  // Import the Sentry configuration
// const Sentry = require("@sentry/node");
// app.use(express.json());

// Sentry configuration
// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   // tracesSampleRate: 1.0, // Adjust this value in production
//   // environment: process.env.NODE_ENV || "development",
//   // debug: true, // Enable debug mode for Sentry
//   // // Add any other Sentry options you need
// });

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

//Secure your application with X-Content-Type-Options, X-XSS-Protection, Strict-Transport-Security, and Content-Security-Policy headers.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-cdn.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: "same-origin",
    referrerPolicy: { policy: "no-referrer" },
  })
);

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

// Enable Sentry's Request Handler to capture HTTP request data
// console.log(Sentry)
// app.use(Handlers.requestHandler());

// Use logging middleware for all routes
app.use(logRequest);

// Routes
const authRoutes = require("./Routes/auth");
const {
  healthPredictLimiter,
  authLimiter,
  appointmentLimiter,
  doctorLimiter,
} = require("./utils/rateLimiter.js");
// const aiRoutes = require("./Routes/aiModesRoute");
app.use("/api/v1", healthPredictLimiter, require("./Routes/healthPredict"));
app.use("/api/v2/auth", authLimiter, authRoutes);
// Routes
app.use(
  "/api/v3/appointments",
  appointmentLimiter,
  require("./Routes/appointmentRoutes")
);
app.use("/api/v4/doctors", doctorLimiter, require("./Routes/doctorRoute")); // doctor routes for availability

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
app.post("/api/v1/dengue", async (req, res) => {
  try {
    // Validate request body
    const frontendData = req.body;

    const formattedData = {
      Sex: frontendData.sex,
      Haemoglobin: frontendData.haemoglobin,
      // "WBC Count": frontendData.wbcCount,
      "Differential Count": frontendData.differentialCount,
      "RBC PANEL": frontendData.rbcPanel,
      PDW: frontendData.pdw,
      Age_Group: frontendData.ageGroup,
    };

    if (!req.body) {
      return res.status(400).json({ error: "No data provided" });
    }

    // Convert request body to JSON string for Python script
    const inputData = JSON.stringify(formattedData);
    console.log("Input data for Python script:", inputData);

    const options = {
      scriptPath: path.join(__dirname),
      args: [inputData],
    };

    const results = await PythonShell.run("dengue.py", options);

    try {
      const prediction = JSON.parse(results[results.length - 1]); // Get the last line of output
      res.json(prediction);
    } catch (parseError) {
      console.error("Error parsing Python output:", parseError);
      res.status(500).json({
        error: "Error processing prediction",
        details: results.join("\n"),
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
});

// Route for Skin Disease Prediction
// Multer setup for file upload
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, and PNG images are allowed."));
    }
  },
});

app.post("/api/v1/skin", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const options = {
    scriptPath: __dirname, // <- use main folder
    args: [path.join(__dirname, req.file.path)],
    pythonOptions: ["-u"], // optional: unbuffered stdout
  };

  PythonShell.run("skin_disease.py", options)
    .then((results) => {
      try {
        const prediction = JSON.parse(results[0]);
        res.json(prediction);
      } catch (error) {
        console.error("Error parsing Python output:", error);
        res.status(500).json({
          error: "Error processing image",
          details: results.join("\n"),
        });
      }
    })
    .catch((err) => {
      console.error("Error running Python script:", err);
      res.status(500).json({
        error: "Error processing image",
        details: err.message,
      });
    });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Enable Sentry's Error Handler to capture any unhandled errors
// app.use(Handlers.errorHandler());

// Global error handler (you can also log to a file here if needed)
app.use((err, req, res, next) => {
  console.error(`Error occurred on route: ${req.originalUrl}`, err);
  res.status(500).send('Internal Server Error');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
