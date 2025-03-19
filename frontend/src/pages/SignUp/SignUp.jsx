import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="flex justify-center w-full">
        <div
          className="w-150   mx-8 my-16 rounded-md h-fit py-6 drop-shadow-lg"
          style={{ backgroundColor: "rgba(14, 217, 208, 0.30)" }}
        >
          <div className="flex flex-col justify-center items-center px-4 pt-8 pb-4 ">
            <p className="text-gray-400 text-sm">
              Hi, create your account here...
            </p>
            <input
              type="text"
              placeholder="Please enter your full name"
              className="my-4 px-14 py-2.5 rounded-md bg-white drop-shadow-lg text-sm"
            />
            <input
              type="text"
              placeholder="Email or phone number"
              className="my-4 px-14 py-2.5 rounded-md bg-white drop-shadow-lg text-sm"
            />
            <input
              type="text"
              placeholder="Password"
              className="my-4 px-14 py-2.5 rounded-md bg-white drop-shadow-lg text-sm"
            />
            <input
              type="text"
              placeholder="Confirm Password"
              className="my-4 px-14 py-2.5 rounded-md bg-white drop-shadow-lg text-sm"
            />
            <button className="cursor-pointer w-78 h-10 rounded-md bg-[#409FB6] text-white drop-shadow-md hover:scale-110">
              Sign Up
            </button>
          </div>
          <p className="text-center text-gray-400">Or</p>
          <div className="flex flex-col justify-center items-center">
            <Link className="flex items-center gap-4 cursor-pointer" to={"/"}>
              {" "}
              <img src="./google_icon.png" alt="w-8 h-8" /> Continue with Google
            </Link>
          </div>
        </div>
        <div className="">
          <img src="./login-signup_image.jpg" alt="h-full w-full" />
        </div>
      </div>
      <div className="border-b-2 border-gray-400"></div>
    </>
  );
};

export default SignUp;
