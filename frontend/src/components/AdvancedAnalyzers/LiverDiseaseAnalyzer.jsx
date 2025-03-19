import React, { useState } from "react";
import bgImage from "../../assets/Liverbgimg.gif"; // Replace with your liver-specific background image path
// import axios from "axios";
// import { BASE_URL } from "../../../config";

const LiverDiseaseAnalyzer = () => {
  // State for input data
  const [inputData, setInputData] = useState({
    age: "",
    gender: "",
    totalBilirubin: "",
    directBilirubin: "",
    alkalinePhosphotase: "",
    alamineAminotransferase: "",
    aspartateAminotransferase: "",
    totalProteins: "",
    albumin: "",
    albuminGlobulinRatio: "",
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
      const response = await axios.post(`${BASE_URL}/liver`, inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <section
      className="w-full h-132 py-6 pt-4 px-16 bg-[#81B4B2]/75 bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full h-full p-8 pt-3 rounded-3xl shadow-lg border-1 border-red-200 bg-[#250902]/93 text-white" style={{
    boxShadow: "8px 8px 4px rgba(183, 28, 28, 0.57)",
  }}>
        <h2 className="text-2xl font-bold text-center mb-4">Liver Disease Analyzer</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-1/2 pr-2">
            {/* Basic Info Section */}
            <div className="pb-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Basic Information</h2>
              <div className="flex w-full gap-3">
                <div>
                  <label className="block text-sm">Age:</label>
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
                    <option className="text-black" value="1">Male</option>
                    <option className="text-black" value="0">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Liver Health Parameters Section */}
            <div className="pb-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Liver Health Parameters</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Total Bilirubin:</label>
                  <input
                    type="number"
                    name="totalBilirubin"
                    placeholder="e.g., 1.2"
                    value={inputData.totalBilirubin}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Direct Bilirubin:</label>
                  <input
                    type="number"
                    name="directBilirubin"
                    placeholder="e.g., 0.3"
                    value={inputData.directBilirubin}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Alkaline Phosphotase:</label>
                  <input
                    type="number"
                    name="alkalinePhosphotase"
                    placeholder="e.g., 300"
                    value={inputData.alkalinePhosphotase}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="border-l flex flex-col pl-8 gap-4 w-1/2">
            {/* Liver Enzymes Section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Liver Enzymes</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Alamine Aminotransferase:</label>
                  <input
                    type="number"
                    name="alamineAminotransferase"
                    placeholder="e.g., 40"
                    value={inputData.alamineAminotransferase}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Aspartate Aminotransferase:</label>
                  <input
                    type="number"
                    name="aspartateAminotransferase"
                    placeholder="e.g., 45"
                    value={inputData.aspartateAminotransferase}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Protein and Albumin Section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Protein and Albumin Levels</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Total Proteins:</label>
                  <input
                    type="number"
                    name="totalProteins"
                    placeholder="e.g., 6.8"
                    value={inputData.totalProteins}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Albumin:</label>
                  <input
                    type="number"
                    name="albumin"
                    placeholder="e.g., 3.5"
                    value={inputData.albumin}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Albumin and Globulin Ratio:</label>
                  <input
                    type="number"
                    name="albuminGlobulinRatio"
                    placeholder="e.g., 1.2"
                    value={inputData.albuminGlobulinRatio}
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
          <div
            className={`mt-6 p-4 rounded text-center ${
              prediction === "[1]" ? "bg-red-400" : "bg-green-400"
            }`}
          >
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

export default LiverDiseaseAnalyzer;
