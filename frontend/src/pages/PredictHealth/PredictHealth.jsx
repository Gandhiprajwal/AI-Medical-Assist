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

  const handlePrediction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${BASE_URL}/symptoms`, {
        data: symptoms,
      });
      console.log("PredictHealth.jsx - response data",response.data);
      const res = response.data.data;
      setDescription(res.dis_des);
      setPrecaution(res.my_precautions);
      setMedications(res.medications);
      setWorkout(res.workout);
      setDiets(res.rec_diet);
      setDisease(res.predicted_disease);
    } catch (error) {
      setErrorMessage("Failed to fetch prediction. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
  <section
    className="max-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-10"
    style={{ backgroundImage: `url('/image3.png')` }} // Replace with your image path 
  >
    {/* Translucent Card Container */}
    <div className="w-[1111px] h-96 bg-[rgba(0,0,0,0.25)] rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center p-8">
      <h2 className="text-white text-3xl font-bold mb-4">AI Health Check</h2>

      {/* Input Field */}
      <div className="w-full flex flex-col items-center space-y-4">
      <input
        type="text"
        className="p-3 rounded-xl w-[80%] text-black placeholder-white-300 bg-white/30 border border-blue outline-none"
        id="symptoms"
        name="symptoms"
        placeholder="Describe how you feel - Enter your symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      {/* Predict Button */}
      <button
        type="submit"
        onClick={handlePrediction}
        className="bg-cyan-600 hover:bg-cyan-600 transition-all duration-300 text-white font-bold py-2 px-8 rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? "Predicting..." : "Predict"}
      </button>

        {/* Results Box */}
        {/* <div className="w-[1054px] h-44 bg-teal-400 bg-opacity-30 opacity-30 rounded-lg border border-white">
          <h4 className="text-center text-white text-lg font-normal font-['Inter'] underline">Result</h4>
        </div> */}

        {description && (
      <div className="w-[1054px] h-44 bg-teal-400 bg-opacity-30 opacity-30 rounded-lg border border-white">
        <h3 className="text-xl font-semibold mb-2 text-center">Results</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {isDiseaseVisible && <p><strong>Disease:</strong> {disease}</p>}
          {isDesVisible && <p><strong>Description:</strong> {description}</p>}
          {isPrecautionVisible && <p><strong>Precaution:</strong> {precaution}</p>}
          {isMedicationsVisible && <p><strong>Medications:</strong> {medications}</p>}
          {isWorkoutVisible && <p><strong>Workout:</strong> {workout}</p>}
          {isDietsVisible && <p><strong>Diet:</strong> {diets}</p>}
        </div>
      </div>
    )}
      </div>
    </div>

    {/* Error Message (if any) */}
    {errorMessage && (
      <p className="text-red-500 text-lg mt-6 font-semibold">{errorMessage}</p>
    )}

  </section>
  )
}
//  default PredictHealth;
