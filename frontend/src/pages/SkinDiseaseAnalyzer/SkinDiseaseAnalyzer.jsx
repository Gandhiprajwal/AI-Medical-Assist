import React, { useState } from "react";
import bgImage from "../../assets/skin-disease.gif"; // Replace with your skin-disease-specific background image path
import axios from "axios";
import { BASE_URL } from "../../config";

const SkinDiseaseAnalyzer = () => {
  const [image, setImage] = useState(null); // State for image upload
  const [prediction, setPrediction] = useState(null); // Prediction result
  const [formError, setFormError] = useState(""); // Error messages
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Button state

  // Handle image file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFormError(""); // Clear any errors
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setPrediction(null); // Reset prediction on new submission
    e.preventDefault();

    if (!image) {
      setFormError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setIsAnalyzing(true); // Show "Analyzing..." on button

    try {
      const response = await axios.post(`${BASE_URL}/skin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPrediction(response.data.prediction); // Store the AI response
    } catch (error) {
      console.error("Error during analysis:", error);
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsAnalyzing(false); // Reset button label
    }
  };

  return (
    <section
      className="w-full h-128 py-6 pt-4 px-6 md:px-16 bg-[#FFABAB]/75 bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="w-full h-full p-6 md:p-8 rounded-3xl shadow-lg border-1 border-blue-200 bg-black/55 text-white"
        style={{
          boxShadow: "8px 8px 4px rgba(18, 107, 127, 0.57)",
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4 mt-32">
          Skin Disease Analyzer
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
          <div className="">
            <label className="block text-sm font-medium mb-2">
              Upload an image of the affected skin:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded bg-white text-black cursor-pointer"
            />
          </div>

          {/* Error Handling */}
          {formError && <p className="text-red-500 text-sm">{formError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-900 border-2 border-white cursor-pointer hover:bg-blue-900/40 text-white font-bold py-2 px-6 rounded"
            disabled={isAnalyzing} // Disable while analyzing
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {/* Prediction Result */}
        {prediction !== null && (
          <div
            className={`mt-6 p-4 rounded text-center ${
              prediction!=='Normal' ? "bg-red-400" : "bg-green-400"
            }`}
          >
            <h3 className="text-lg font-bold">
              {prediction !=="Normal"
                ? `High Risk! Please consult a dermatologist immediately. -> ${prediction}`
                : `Low Risk! Likely not serious, but monitor symptoms. -> ${prediction}`}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkinDiseaseAnalyzer;
