import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { PredictHealth } from "./pages/PredictHealth/PredictHealth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict-health" element={<PredictHealth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
