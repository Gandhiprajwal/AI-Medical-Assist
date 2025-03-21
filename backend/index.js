import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import healthRoute from "./Routes/healthPredict.js";


const app = express();
const path = require("path");
const { spawn } = require("child_process");

const PORT = 3000;

// Ensure correct paths to AI models
const heartModel = "D:\\AI-MedLab\\backend\\aimodels\\heart.pkl";
const liverModel = "D:\\AI-MedLab\\backend\\aimodels\\liver.pkl";

const pythonScriptPathForLiver = path.resolve(__dirname, "liver.py");
const pythonScriptPathForHeart = path.resolve(__dirname, "heart.py");

// Try using a virtual environment, else fallback to system Python
let PYTHON_PATH = "D:\\AI-MedLab\\venv\\Scripts\\python.exe"; // Virtual environment
const GLOBAL_PYTHON_PATH = "python"; // Use system Python as a fallback

// Check if Python executable exists
const fs = require("fs");
if (!fs.existsSync(PYTHON_PATH)) {
  console.warn("⚠️ Virtual environment not found, using system Python instead.");
  PYTHON_PATH = GLOBAL_PYTHON_PATH;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to handle AI model predictions
const runPythonScript = (res, scriptPath, modelPath, inputData) => {
  try {
    if (!inputData) {
      return res.status(400).json({ error: "Missing input data" });
    }

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

// Route for Heart Prediction
// app.post("/api/v1/heart", (req, res) => {
//   console.log("Received heart request with data:", req.body);
//   runPythonScript(res, pythonScriptPathForHeart, heartModel, req.body.data);
// });

// Route for Liver Prediction
app.post("/api/v1/liver", (req, res) => {
  console.log("Received liver request with data:", req.body);
  runPythonScript(res, pythonScriptPathForLiver, liverModel, req.body.data);
});
app.post("/api/v1/heart", (req, res) => {
  const inputData = req.body; // Extract JSON input from request

  if (!inputData) {
      return res.status(400).json({ error: "No input data provided" });
  }

  // Convert to JSON string
  const jsonString = JSON.stringify(inputData);

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

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
