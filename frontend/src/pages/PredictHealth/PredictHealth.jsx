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

    const formattedSymptoms = symptoms
      .split(",")
      .map((symptom) => symptom.trim().replace(/\s+/g, "_"))
      .join(",");

    try {
      const response = await axios.post(`${BASE_URL}/symptoms`, {
        data: formattedSymptoms,
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
      className="lg:h-124 md:h-1/2 w-full bg-cover dark:bg-[#000000] bg-center flex flex-col items-center justify-center md:px-16 px-8 py-10"
      style={{ backgroundImage: `url('/image3.png')` }}
    >
      <div
        className="w-full lg:h-100 md:h-1/2 dark:bg-[#000000]/70 bg-[rgba(0,0,0,0.25)] rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center p-8"
        style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)" }}
      >
        <h2 className="text-white md:text-3xl text-xl font-bold mb-4">AI Health Check</h2>

        <div className="w-full flex flex-col items-center space-y-4">
          <input
            type="text"
            className="p-3 rounded-xl text-center md:w-[60%] w-full dark:text-white text-black placeholder-white-300 dark:bg-[#000000] bg-white outline-none"
            style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)" }}
            id="symptoms"
            name="symptoms"
            placeholder="Please enter symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <div className="w-full lg:text-center text-justify mt-2">
            <p className="text-blue-200 text-sm">
              <strong>Examples:</strong> {exampleSymptoms.join(", ")}
            </p>
          </div>

          <button
            type="submit"
            onClick={handlePrediction}
            className="border bg-[#2E93B1]/80 hover:cursor-pointer duration-300 text-white font-bold py-2 px-8 rounded-lg hover:scale-105 hover:opacity-60"
            style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)" }}
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>

          {(description || errorMessage) && (
            <div
              className="w-full h-28 bg-[#0ED9D0]/30 dark:bg-[#000000]/30 rounded-lg border border-white p-4 overflow-y-auto"
              style={{ maxHeight: "200px", overflowY: "scroll" }}
            >
              <h3 className="md:text-xl text-lg font-semibold mb-2 text-slate-300 dark:text-slate-300 text-center">Results:</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {errorMessage && (
                  <p className="text-center text-red-400 md:text-lg text-sm font-semibold">
                    {errorMessage}
                  </p>
                )}
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
    </section>
  );
};
