import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

export const PredictHealth = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("");
  const [precaution, setPrecaution] = useState("");
  const [medications, setMedications] = useState("");
  const [workout, setWorkout] = useState("");
  const [diets, setDiets] = useState("");
  const [disease, setDisease] = useState("");

  const [isDesVisible, setIsDesVisible] = useState(false);
  const [isPrecautionVisible, setIsPrecautionVisible] = useState(false);
  const [isMedicationsVisible, setIsMedicationsVisible] = useState(false);
  const [isWorkoutVisible, setIsWorkoutVisible] = useState(false);
  const [isDietsVisible, setIsDietsVisible] = useState(false);
  const [isDiseaseVisible, setIsDiseaseVisible] = useState(false);

  const exampleSymptoms = [
    'itching', 'skin_rash', 'joint_pain', 'headache', 'nausea', 'vomiting',
    'chills', 'cough', 'high_fever', 'stomach_pain', 'fatigue', 'loss_of_appetite',
    'sweating', 'weight_gain', 'lethargy', 'back_pain', 'breathlessness',
    'abdominal_pain', 'dizziness', 'constipation', 'yellowing_of_eyes', 'red_spots_over_body'
  ];

  const handlePrediction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Validate input: ensure all symptoms are formatted correctly (e.g., no extra spaces, proper underscores)
    const formattedSymptoms = symptoms
      .split(",") // Split input into an array based on commas
      .map((symptom) => symptom.trim().replace(/\s+/g, "_")) // Trim spaces and replace spaces with underscores
      .join(","); // Join back into a comma-separated string

    try {
      const response = await axios.post(`${BASE_URL}/symptoms`, {
        data: formattedSymptoms, // Send properly formatted symptoms to the API
      });
      console.log("PredictHealth.jsx - response data", response.data);
      const res = response.data.data;

      setDescription(res.dis_des);
      setPrecaution(res.my_precautions);
      setMedications(res.medications);
      setWorkout(res.workout);
      setDiets(res.rec_diet);
      setDisease(res.predicted_disease);

      setIsDesVisible(true);
      setIsPrecautionVisible(true);
      setIsMedicationsVisible(true);
      setIsWorkoutVisible(true);
      setIsDietsVisible(true);
      setIsDiseaseVisible(true);
    } catch (error) {
      setErrorMessage("Failed to fetch prediction. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    <section
      className="h-124 bg-cover bg-center flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url('/image3.png')` }} // Replace with your image path
    >
      {/* Translucent Card Container */}
      <div
        className="w-[1111px] h-100 bg-[rgba(0,0,0,0.25)] rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center p-8"
        style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)" }}
      >
        <h2 className="text-white text-3xl font-bold mb-4">AI Health Check</h2>

        {/* Input Field */}
        <div className="w-full flex flex-col items-center space-y-4">
          <input
            type="text"
            className="p-3 rounded-xl w-[60%] text-black placeholder-white-300 bg-white outline-none"
            style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)" }}
            id="symptoms"
            name="symptoms"
            placeholder="Please enter symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          {/* Examples Section */}
          <div className="w-full text-center mt-2">
            <p className="text-white text-sm">
              <strong>Examples:</strong> {exampleSymptoms.join(", ")}
            </p>
          </div>

          {/* Predict Button */}
          <button
            type="submit"
            onClick={handlePrediction}
            className="border bg-[#2E93B1]/80 hover:cursor-pointer duration-300 text-white font-bold py-2 px-8 rounded-lg hover:scale-105 hover:bg-[#0C8667]/70"
            style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)" }}
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>

          {/* Results Box */}
          {description && (
            <div
              className="w-[1054px] h-28 bg-[#0ED9D0]/30 rounded-lg border border-white p-4 overflow-y-auto"
              style={{ maxHeight: "200px", overflowY: "scroll" }}
            >
              <h3 className="text-xl font-semibold mb-2 text-center">Results</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {isDiseaseVisible && (
                  <p className="bg-red-100 p-2 rounded-lg">
                    <strong>Disease:</strong> {disease}
                  </p>
                )}
                {isDesVisible && (
                  <p className="bg-blue-100 p-2 rounded-lg">
                    <strong>Description:</strong> {description}
                  </p>
                )}
                {isPrecautionVisible && (
                  <p className="bg-green-100 p-2 rounded-lg">
                    <strong>Precaution:</strong> {precaution}
                  </p>
                )}
                {isMedicationsVisible && (
                  <p className="bg-yellow-100 p-2 rounded-lg">
                    <strong>Medications:</strong> {medications}
                  </p>
                )}
                {isWorkoutVisible && (
                  <p className="bg-purple-100 p-2 rounded-lg">
                    <strong>Workout:</strong> {workout}
                  </p>
                )}
                {isDietsVisible && (
                  <p className="bg-pink-100 p-2 rounded-lg">
                    <strong>Diet:</strong> {diets}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message (if any) */}
      {errorMessage && (
        <p className="text-red-500 text-lg mt-6 font-semibold">
          {errorMessage}
        </p>
      )}
    </section>
  );
};
