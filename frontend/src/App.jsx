import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { PredictHealth } from "./pages/PredictHealth/PredictHealth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Findadoctor from "./components/FindADoctor/Findadoctor";
import HeartDiseaseAnalyzer from "./components/AdvancedAnalyzers/HeartDiseaseAnalyzer";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict-health" element={<PredictHealth />} />
          <Route path="/find-a-doctor" element={<Findadoctor/>} />
          <Route path="/feedback" element={<>Feedback</>} />
          <Route path="/sign-in" element={<>Sign In</>} />
          <Route path="/sign-up" element={<>Sign Up</>} />
          <Route path="/heart-disease-analyzer" element={<HeartDiseaseAnalyzer />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>
  );
}

export default App;
