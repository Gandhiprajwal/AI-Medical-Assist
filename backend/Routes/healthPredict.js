import express from "express";
import { spawn } from "child_process";
const router = express.Router({ mergeParams: true });

const pythonScriptPathForSymptoms = "symptoms.py";
const symptomsModel = "aimodels/svc.pkl";

router.post("/symptoms", (req, res) => {
  let responseSent = false; // Flag to track if response has been sent
  try {
    const data = Array.isArray(req.body.data) ? req.body.data : [req.body.data];
    console.log({ dataInString: JSON.stringify({ data }) });
    
    const pythonProcess = spawn("python", [
        pythonScriptPathForSymptoms,
        "--loads",
        symptomsModel,
        JSON.stringify({ data }),
      ]);
      

    let prediction;
    pythonProcess.stdout.on("data", (data) => {
    const dataString = data.toString();
    try {
        prediction = JSON.parse(dataString);
        console.log("healthPredict.js - Prediction:", prediction);
    } catch (err) {
        console.error("Error parsing JSON from Python output:", err.message);
        console.error("Raw data:", dataString);
    }
    });


    pythonProcess.stderr.on("data", (data) => {
      console.error("Python script error:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      console.log("Python process closed with code:", code);
      console.log("Prediction:", prediction);
      if (!responseSent) {
        res.json({ data: prediction });
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
      responseSent = true;
      return res.status(500).send("Internal Server Error");
    }
  }
});

export default router;