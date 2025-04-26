import React, { useState } from "react";
import bgImage from "../../assets/Liverbgimg.gif"; // Replace with your liver-specific background image path
import axios from "axios";
import { BASE_URL } from "../../config";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setFormError(""); // Clear error on change
  };

  // Validation logic for ranges
  const validateRanges = () => {
    const errors = [];

    if (inputData.age < 18 || inputData.age > 100) {
      errors.push("Age should be between 18 and 100 years.");
    }
    if (!["0", "1"].includes(inputData.gender)) {
      errors.push("Please select a valid gender.");
    }
    if (inputData.totalBilirubin < 0.1 || inputData.totalBilirubin > 5) {
      errors.push("Total Bilirubin should be between 0.1 and 5 mg/dL.");
    }
    if (inputData.directBilirubin < 0 || inputData.directBilirubin > 1.5) {
      errors.push("Direct Bilirubin should be between 0 and 1.5 mg/dL.");
    }
    if (
      inputData.alkalinePhosphotase < 20 ||
      inputData.alkalinePhosphotase > 1200
    ) {
      errors.push(
        "Alkaline Phosphotase should be between 20 and 1200 U/L."
      );
    }
    if (
      inputData.alamineAminotransferase < 0 ||
      inputData.alamineAminotransferase > 250
    ) {
      errors.push(
        "Alamine Aminotransferase should be between 0 and 250 U/L."
      );
    }
    if (
      inputData.aspartateAminotransferase < 0 ||
      inputData.aspartateAminotransferase > 250
    ) {
      errors.push(
        "Aspartate Aminotransferase should be between 0 and 250 U/L."
      );
    }
    if (inputData.totalProteins < 6 || inputData.totalProteins > 8.5) {
      errors.push("Total Proteins should be between 6 and 8.5 g/dL.");
    }
    if (inputData.albumin < 3.5 || inputData.albumin > 5.5) {
      errors.push("Albumin should be between 3.5 and 5.5 g/dL.");
    }
    if (
      inputData.albuminGlobulinRatio < 0.8 ||
      inputData.albuminGlobulinRatio > 2.5
    ) {
      errors.push(
        "Albumin/Globulin Ratio should be between 0.8 and 2.5."
      );
    }

    setFormError(errors.join(" "));
    return errors.length === 0;
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

    if (!validateRanges()) {
      return;
    }

    try {
      setIsSubmitting(true); // Show "Predicting..." on the button
      const response = await axios.post(`${BASE_URL}/liver`, inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setIsSubmitting(false); // Reset button text
    }
  };

  return (
    <section
      className="pb-4 w-full h-auto px-6 md:px-16 bg-[#81B4B2]/75 bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="w-full h-full p-6 md:p-8 rounded-3xl shadow-lg border-1 border-red-200 bg-[#250902]/93 text-white"
        style={{
          boxShadow: "8px 8px 4px rgba(183, 28, 28, 0.57)",
        }}
      >
        <h2 className="text-md font-bold text-center mb-1">
          Liver Disease Analyzer
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            {/* <h2 className="text-lg font-semibold mb-3">Basic Information</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium">Gender:</label>
                <select
                  name="gender"
                  value={inputData.gender}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                >
                  <option className="text-black" value="">
                    Select Gender
                  </option>
                  <option className="text-black" value="1">
                    Male
                  </option>
                  <option className="text-black" value="0">
                    Female
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Health Parameters */}
          <div>
            {/* <h2 className="text-lg font-semibold mb-3">
              Liver Health Parameters
            </h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Liver Health Fields */}
              <div>
                <label className="block text-sm font-medium">
                  Total Bilirubin (0.1 - 5 mg/dL):
                </label>
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
                <label className="block text-sm font-medium">
                  Direct Bilirubin (0 - 1.5 mg/dL):
                </label>
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
                <label className="block text-sm font-medium">
                  Alkaline Phosphotase (20 - 1200 U/L):
                </label>
                <input
                  type="number"
                  name="alkalinePhosphotase"
                  placeholder="e.g., 300"
                  value={inputData.alkalinePhosphotase}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Alamine Aminotransferase (0 - 250 U/L):
                </label>
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
                <label className="block text-sm font-medium">
                  Aspartate Aminotransferase (0 - 250 U/L):
                </label>
                <input
                  type="number"
                  name="aspartateAminotransferase"
                  placeholder="e.g., 45"
                  value={inputData.aspartateAminotransferase}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Total Proteins (6 - 8.5 g/dL):
                </label>
                <input type="number" name="totalProteins" placeholder="e.g., 6.8" value={inputData.totalProteins} onChange={handleInputChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Albumin (3.5 - 5.5 g/dL):
                </label>
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
                <label className="block text-sm font-medium">
                  Albumin/Globulin Ratio (0.8 - 2.5):
                </label>
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
          {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}

          {/* Submit Button */}
          <div className="text-center mt-2">
            <button
              type="submit"
              className="bg-yellow-900 border-2 border-white cursor-pointer hover:bg-green-900 text-white font-bold py-2 px-6 rounded"
            >
              {isSubmitting ? "Predicting..." : "Predict"}
            </button>
          </div>
        </form>

        {/* Prediction Result */}
        {prediction !== null && (
          <div
            className={`mt-6 p-4 rounded text-center ${prediction === 1 ? "bg-red-400" : "bg-green-400"
              }`}
          >
            <h3 className="text-lg font-bold">
              {prediction === 1
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
