import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-1/2 p-10 dark:bg-black ">
          <div
            className="rounded-2xl h-fit py-6 drop-shadow-lg"
            style={{ backgroundColor: "rgba(14, 217, 208, 0.30)", boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.55)" }}
          >
            <div className="flex flex-col justify-center items-center pt-8 pb-4 px-8 gap-4">
              <p className="text-gray-700 dark:text-white  text-sm">
                Hi, create your account here...
              </p>
              <input
                type="text"
                placeholder="Please enter your full name"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
              />
              <input
                type="text"
                placeholder="Email or phone number"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
              />
              <input
                type="text"
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
              />
              <input
                type="text"
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
              />
              <button className="cursor-pointer py-3 w-full rounded-md bg-[#409FB6] text-white drop-shadow-md hover:bg-[#338096]/70">
                Sign Up
              </button>
            </div>
            <p className="text-center text-gray-400 pb-4">Or</p>
            <div className="flex flex-col justify-center items-center">
              <Link className="flex items-center gap-4 cursor-pointer bg-white px-8 py-2 rounded-lg" to={"/"}>
                {" "}
                <img src="./google_icon.png" className="w-8 h-8" /> Continue with Google
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <img src="./login-signup_image.jpg" className="h-full w-full relative" />
          <div className="p-8 py-12 text-white absolute top-0 w-[65%] h-full dark:bg-black/75 bg-[#2E93B1]/75">
            <h2 className="text-3xl font-semibold">WELCOME TO</h2>
            <h3 className="text-3xl font-semibold pb-8">AI MEDICAL ASSIST WEB APP!</h3>
            <p className="text-justify pb-8">Wondering about your symptoms? AI Medical Assist makes it easy to check your health from the comfort of your home! Simply enter your symptoms, and our AI-powered system will analyze them to provide instant health insights. Whether it’s a minor concern or something that needs attention, our platform helps you make informed decisions.</p>
            <p className="text-justify pb-8">If needed, you can also book an appointment with a doctor for expert advice—all in just a few clicks! Our AI technology ensures quick, reliable, and secure health predictions, helping you take the first step toward better healthcare.</p>
            <p className="text-2xl font-thin pb-2">Your smart health companion.</p>
            <p className="text-2xl font-thin pb-2">Seamless AI and Doctor support.</p>
            <p className="text-2xl font-thin pb-2">Try for free today!</p>

          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-400"></div>
    </>
  );
};

export default SignUp;
