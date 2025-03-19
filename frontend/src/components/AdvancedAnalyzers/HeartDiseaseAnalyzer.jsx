import React, { useState } from "react";
import bgImage from "../../assets/heartbgimg3.gif"
// import axios from "axios";
// import { BASE_URL } from "../../../config";

const HeartDiseaseAnalyzer = () => {
  // State for input data
  const [inputData, setInputData] = useState({
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterol: "",
    heartRate: "",
    angina: "",
    stSegment: "",
    vesselCount: "",
    lifestyle: "",
    history: "",
  });

  // Prediction & Errors
  const [prediction, setPrediction] = useState(null);
  const [formError, setFormError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setFormError(""); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormComplete = Object.values(inputData).every((field) => field !== "");
    if (!isFormComplete) {
      setFormError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/heart`, inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <section className="opacity-95 w-full h-132 py-5 pb-8 px-20 bg-[#81B4B2] bg-cover bg-center overflow-y-auto" style={{
        backgroundImage: `url(${bgImage})`,
      }}>
    <div className="w-full h-full p-8 pt-3 border-1 border-[#000443] rounded-3xl shadow-lg bg-[#000433]/90 text-white" style={{
    boxShadow: "8px 8px 4px rgba(129, 185, 192, 0.57)",
  }}>
      <h2 className="text-2xl font-bold text-center mb-4">Heart Disease Analyzer</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex flex-col gap-4 w-1/2">
        {/* Basic Info Section */}
        <div className="pb-4 flex flex-col ">
          <h2 className="text-lg font-semibold mb-3">Basic Information</h2>
          <div className="flex w-full gap-3">
            <div>
              <label className="block text-sm ">Age:</label>
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                value={inputData.age}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender:</label>
              <select
                name="gender"
                value={inputData.gender}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                <option className="text-black" value="">Select Gender</option>
                <option className="text-black" value="male">Male</option>
                <option className="text-black" value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Health Parameters Section */}
        <div className="pb-4">
          <h2 className="text-lg font-semibold mb-3">Health Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Resting Blood Pressure (mmHg):</label>
              <input
                type="number"
                name="bloodPressure"
                placeholder="e.g., 120"
                value={inputData.bloodPressure}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Serum Cholesterol (mg/dL):</label>
              <input
                type="number"
                name="cholesterol"
                placeholder="e.g., 200"
                value={inputData.cholesterol}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Max Heart Rate Achieved:</label>
              <input
                type="number"
                name="heartRate"
                placeholder="e.g., 150"
                value={inputData.heartRate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>
        </div>

        <div className="border-l flex flex-col pl-8 gap-4 w-1/2">
        {/* Lifestyle and Medical History Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Lifestyle & Medical History</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Exercise Induced Angina:</label>
              <select
                name="angina"
                value={inputData.angina}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Slope of Peak Exercise ST Segment:</label>
              <input
                type="number"
                name="stSegment"
                placeholder="e.g., 1"
                value={inputData.stSegment}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Number of Major Vessels (0-3):</label>
              <input
                type="number"
                name="vesselCount"
                placeholder="e.g., 2"
                value={inputData.vesselCount}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Error Handling */}
        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-900 border-2 border-white cursor-pointer border-black hover:bg-green-900 text-white font-bold py-2 px-6 rounded"
          >
            Predict
          </button>
        </div>
        </div>
      </form>

      {/* Prediction Result */}
      {prediction !== null && (
        <div className={`mt-6 p-4 rounded text-center ${prediction === "[1]" ? "bg-red-400" : "bg-green-400"}`}>
          <h3 className="text-lg font-bold">
            {prediction === "[1]"
              ? "High Risk! Please consult a doctor immediately."
              : "Low Risk! You're in good health."}
          </h3>
        </div>
      )}
    </div>
    </section>
  );
};

export default HeartDiseaseAnalyzer;
