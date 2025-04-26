import React, { useState } from "react";
import bgImage from "../../assets/dengue-fever.gif";
import axios from "axios";
import { BASE_URL } from "../../config";

const DengueFeverAnalyzer = () => {
  // State for input data
  const [inputData, setInputData] = useState({
    ageGroup: "",
    sex: "",
    haemoglobin: "",
    wbcCount: "",
    differentialCount: "",
    rbcPanel: "",
    pdw: "",
  });

  // Prediction, Errors, and Button State
  const [prediction, setPrediction] = useState(null);
  const [formError, setFormError] = useState("");
  const [isPredicting, setIsPredicting] = useState(false); // Button state

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setFormError(""); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null); // Reset prediction on new submission
    const isFormComplete = Object.values(inputData).every(
      (field) => field !== ""
    );

    if (!isFormComplete) {
      setFormError("Please fill out all fields.");
      return;
    }

    setIsPredicting(true); // Show "Predicting..." on button

    try {
      const response = await axios.post(`${BASE_URL}/dengue`, inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsPredicting(false); // Reset button label
    }
  };

  return (
    <section
      className="w-full h-auto py-6 pt-4 px-6 md:px-16 bg-[#8EB1C7]/75 bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="w-full h-full p-6 md:p-8 rounded-3xl shadow-lg border-1 border-blue-200 bg-[#10375C]/85 text-white"
        style={{
          boxShadow: "8px 8px 4px rgba(28, 60, 183, 0.47)",
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          Dengue Fever Analyzer
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          {/* Left Column */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2 pr-2">
            {/* Basic Info Section */}
            <div className="pb-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Age Group:</label>
                  <select
                    name="ageGroup"
                    value={inputData.ageGroup}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  >
                    <option className="text-black" value="">
                      Select Age Group
                    </option>
                    <option className="text-black" value="Child">
                      Child
                    </option>
                    <option className="text-black" value="Teen">
                      Teen
                    </option>
                    <option className="text-black" value="Adult">
                      Adult
                    </option>
                    <option className="text-black" value="Middle Age">
                      Middle Age
                    </option>
                    <option className="text-black" value="Senior">
                      Senior
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Sex:</label>
                  <select
                    name="sex"
                    value={inputData.sex}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  >
                    <option className="text-black" value="">
                      Select Sex
                    </option>
                    <option className="text-black" value="Male">
                      Male
                    </option>
                    <option className="text-black" value="Female">
                      Female
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Haemoglobin & WBC Count Section */}
            <div className="pb-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Blood Parameters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Haemoglobin (11.00 - 18.60):
                  </label>
                  <input
                    type="number"
                    name="haemoglobin"
                    placeholder="e.g., 13.5"
                    value={inputData.haemoglobin}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    min="11"
                    max="18.6"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    WBC Count (7.60 - 9.29):
                  </label>
                  <input
                    type="number"
                    name="wbcCount"
                    placeholder="e.g., 8.2"
                    value={inputData.wbcCount}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    min="7.6"
                    max="9.29"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="border-l flex flex-col pl-8 gap-4 w-full md:w-1/2">
            {/* Additional Blood Parameters Section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Blood Analysis Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Differential Count:
                  </label>
                  <input
                    type="number"
                    name="differentialCount"
                    placeholder="Enter Count"
                    value={inputData.differentialCount}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">RBC Panel:</label>
                  <input
                    type="number"
                    name="rbcPanel"
                    placeholder="Enter Value"
                    value={inputData.rbcPanel}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">PDW (1.00 - 53.75):</label>
                  <input
                    type="number"
                    name="pdw"
                    placeholder="e.g., 35"
                    value={inputData.pdw}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    min="1"
                    max="53.75"
                    step="0.01"
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
                className="bg-blue-900 border-2 border-white cursor-pointer hover:opacity-70 text-white font-bold py-2 px-6 rounded"
                disabled={isPredicting} // Disable while predicting
              >
                {isPredicting ? "Predicting..." : "Predict"}
              </button>
            </div>
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

export default DengueFeverAnalyzer;
