const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const path = require("path");
// const { pythonScriptPathForLiver, liverModel } = require("..");
const {pythonScriptPathForLiver, liverModel,PYTHON_PATH} = require("../index.js");


// Ensure correct paths to AI models
// const heartModel = "D:\\AI-MedLab\\backend\\aimodels\\heart.pkl";
// const liverModel = "D:\\AI-MedLab\\backend\\aimodels\\liver.pkl";

// const pythonScriptPathForLiver = path.resolve(__dirname, "liver.py");
// const pythonScriptPathForHeart = path.resolve(__dirname, "heart.py");

// Try using a virtual environment, else fallback to system Python
// let PYTHON_PATH = "D:\\AI-MedLab\\venv\\Scripts\\python.exe"; // Virtual environment
// const GLOBAL_PYTHON_PATH = "python"; // Use system Python as a fallback

// Liver python script 
// const runPythonScript = (res, scriptPath, modelPath, inputData) => {
//   try {
//     if (!inputData) {
//       return res.status(400).json({ error: "Missing input data" });
//     }
//     // console.log(inputData);

//     const pythonProcess = spawn(PYTHON_PATH, [
//       scriptPath,
//       "--loads",
//       modelPath,
//       JSON.stringify(inputData),
//     ]);

//     let prediction = "";
//     let responseSent = false; // Track if response has been sent

//     pythonProcess.stdout.on("data", (data) => {
//       console.log("Python script output:", data.toString());
//       prediction += data.toString().trim();
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error("Python script error:", data.toString());
//       if (!responseSent) {
//         res.status(500).json({ error: data.toString() });
//         responseSent = true;
//       }
//     });

//     pythonProcess.on("close", (code) => {
//       console.log("Python process closed with code:", code);
//       if (!responseSent) {
//         try {
//           const formattedPrediction = JSON.parse(
//             prediction.replace(/\[|\]/g, "")
//           );
//           res.json({ prediction: formattedPrediction });
//         } catch (error) {
//           res.json({ prediction });
//         }
//         responseSent = true;
//       }
//     });

//     pythonProcess.on("error", (error) => {
//       console.error("Python process error:", error);
//       if (!responseSent) {
//         res.status(500).send("Internal Server Error");
//         responseSent = true;
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     if (!responseSent) {
//       res.status(500).send("Internal Server Error");
//       responseSent = true;
//     }
//   }
// };

// // Route for Liver Prediction
// router.post("/liver", (req, res) => {
//   // console.log("Received liver request with data:", req.body);
//   const inputData = req.body;
//   // Transform the data
//   const formattedData = {
//     Age: Number(inputData.age),
//     Gender: inputData.gender === "0" ? "Female" : "Male",
//     TB: parseFloat(inputData.totalBilirubin),
//     DB: parseFloat(inputData.directBilirubin),
//     Alkphos: parseInt(inputData.alkalinePhosphotase),
//     Sgpt: parseInt(inputData.alamineAminotransferase),
//     Sgot: parseInt(inputData.aspartateAminotransferase),
//     TP: parseFloat(inputData.totalProteins),
//     ALB: parseFloat(inputData.albumin),
//     "A/G Ratio": parseFloat(inputData.albuminGlobulinRatio),
//   };
//   console.log(formattedData);
//   runPythonScript(res, pythonScriptPathForLiver, liverModel, formattedData);
// });

// module.exports = router;


// 