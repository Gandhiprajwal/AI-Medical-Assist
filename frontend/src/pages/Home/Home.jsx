import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-2xl underline">Home</h1>
      <p className="text-xl">This is the home page</p>
      <div className="h-8 w-28 flex justify-center items-center border bg-gray-700 text-white rounded-md">
        <Link to="/predict-health" >Predict Health</Link>
      </div>
      
    </>
  );
};

export default Home;
