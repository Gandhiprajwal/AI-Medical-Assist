import React, { useState } from "react";
import bgImage from "../../assets/heartbgimg3.gif";
import axios from "axios";
import { BASE_URL } from "../../config";

const HeartDiseaseAnalyzer = () => {
  // State for input data
  const [inputData, setInputData] = useState({
    age: "",
    gender: "",
    heartRate: "",
    systolicBP: "",
    diastolicBP: "",
    bloodSugar: "",
    ckmb: "",
    troponin: "",
  });

  // Prediction & Errors
  const [prediction, setPrediction] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setFormError(""); // Clear error on change
  };

  // Validation logic for ranges
  const validateRanges = () => {
    const newErrors = [];

    if (inputData.age < 18 || inputData.age > 100) {
      newErrors.push("Age should be between 18 and 100.");
    }
    if (!["male", "female"].includes(inputData.gender)) {
      newErrors.push("Please select a valid gender.");
    }
    if (inputData.heartRate < 50 || inputData.heartRate > 120) {
      newErrors.push("Heart Rate should be between 50 and 120 bpm.");
    }
    if (inputData.systolicBP < 90 || inputData.systolicBP > 180) {
      newErrors.push("Systolic Blood Pressure should be between 90 and 180 mmHg.");
    }
    if (inputData.diastolicBP < 60 || inputData.diastolicBP > 120) {
      newErrors.push("Diastolic Blood Pressure should be between 60 and 120 mmHg.");
    }
    if (inputData.bloodSugar < 70 || inputData.bloodSugar > 200) {
      newErrors.push("Blood Sugar should be between 70 and 200 mg/dL.");
    }
    if (inputData.ckmb < 0 || inputData.ckmb > 10) {
      newErrors.push("CK-MB should be between 0 and 10 ng/mL.");
    }
    if (inputData.troponin < 0 || inputData.troponin > 2) {
      newErrors.push("Troponin should be between 0 and 2 ng/mL.");
    }

    setFormError(newErrors.join(" "));
    return newErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null); // Reset prediction on new submission
    const isFormComplete = Object.values(inputData).every((field) => field !== "");
    if (!isFormComplete) {
      setFormError("Please fill out all fields.");
      return;
    }

    if (!validateRanges()) {
      return;
    }

    try {
      setIsSubmitting(true); // Show "Predicting..." on the button
      const response = await axios.post(`${BASE_URL}/heart`, inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setIsSubmitting(false); // Reset button text
    }
  };

  return (
    <section
      className="opacity-95 w-full h-128 py-5 pb-8 px-20 bg-[#81B4B2] bg-cover bg-center overflow-y-auto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="w-full h-full p-8 pt-3 border-1 border-[#000443] rounded-3xl shadow-lg bg-[#000433]/90 text-white"
        style={{ boxShadow: "8px 8px 4px rgba(129, 185, 192, 0.57)" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Heart Disease Analyzer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            {/* Basic Info Section */}
            <div className="pb-4 flex flex-col w-1/2">
              <h2 className="text-lg font-semibold mb-3">Basic Information</h2>
              <div className="flex flex-col w-full gap-3">
                <div>
                  <label className="block text-sm">
                    Age (18 - 100 years):
                  </label>
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
                  <label className="block text-sm">Gender:</label>
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
            <div className="pb-4 w-full">
              <h2 className="text-lg font-semibold mb-3">Health Parameters</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">
                    Heart Rate (50 - 120 bpm):
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    placeholder="e.g., 72"
                    value={inputData.heartRate}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Systolic Blood Pressure (90 - 180 mmHg):
                  </label>
                  <input
                    type="number"
                    name="systolicBP"
                    placeholder="e.g., 120"
                    value={inputData.systolicBP}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Diastolic Blood Pressure (60 - 120 mmHg):
                  </label>
                  <input
                    type="number"
                    name="diastolicBP"
                    placeholder="e.g., 80"
                    value={inputData.diastolicBP}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Blood Sugar (70 - 200 mg/dL):
                  </label>
                  <input
                    type="number"
                    name="bloodSugar"
                    placeholder="e.g., 100"
                    value={inputData.bloodSugar}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    CK-MB (0 - 10 ng/mL):
                  </label>
                  <input
                    type="number"
                    name="ckmb"
                    placeholder="e.g., 5"
                    value={inputData.ckmb}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Troponin (0 - 2 ng/mL):
                  </label>
                  <input
                    type="number"
                    name="troponin"
                    placeholder="e.g., 0.4"
                    value={inputData.troponin}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error Handling */}
          {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-900 border-2 border-white cursor-pointer border-black hover:bg-green-900 text-white font-bold py-2 px-6 rounded"
            >
              {isSubmitting ? "Predicting..." : "Predict"}
            </button>
          </div>
        </form>

        {/* Prediction Result */}
        {prediction !== null && (
          <div
            className={`mt-6 p-4 rounded text-center ${
              prediction === "positive" ? "bg-red-400" : "bg-green-400"
            }`}
          >
            <h3 className="text-lg font-bold">
              {prediction === "positive"
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
