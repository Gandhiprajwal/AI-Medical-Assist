import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { PredictHealth } from "./pages/PredictHealth/PredictHealth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Findadoctor from "./components/FindADoctor/Findadoctor";
import HeartDiseaseAnalyzer from "./pages/HeartDiseaseAnalyzer/HeartDiseaseAnalyzer";
import LiverDiseaseAnalyzer from "./pages/LiverDiseaseAnalyzer/LiverDiseaseAnalyzer";
import SkinDiseaseAnalyzer from "./pages/SkinDiseaseAnalyzer/SkinDiseaseAnalyzer";
import DengueFeverAnalyzer from "./pages/DengueFeverAnalyzer/DengueFeverAnalyzer";
import SignUp from "./pages/SignUp/SignUp";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict-health" element={<PredictHealth />} />
          <Route path="/find-a-doctor" element={<Findadoctor />} />
          <Route path="/feedback" element={<>Feedback</>} />
          <Route path="/sign-in" element={<>Sign In</>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/heart-disease-analyzer"
            element={<HeartDiseaseAnalyzer />}
          />
          <Route
            path="/liver-disease-analyzer"
            element={<LiverDiseaseAnalyzer />}
          />
          <Route
            path="/skin-disease-analyzer"
            element={<SkinDiseaseAnalyzer />}
          />
          <Route
            path="/dengue-fever-analyzer"
            element={<DengueFeverAnalyzer />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
