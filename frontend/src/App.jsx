import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import SignUp from "./pages/SignupSignin/SignUp";
import SignIn from "./pages/SignupSignin/SingIn";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();

  // List of routes where Navbar and Footer should not be displayed
  const excludedRoutes = ["/sign-up", "/sign-in"];

  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <>
      {!isExcludedRoute && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict-health" element={<PredictHealth />} />
        <Route path="/find-a-doctor" element={<Findadoctor />} />
        <Route path="/sign-in" element={<SignIn />} />
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
      {!isExcludedRoute && <Footer />}
    </>
  );
}

export default App;
