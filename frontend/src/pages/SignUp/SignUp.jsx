import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div
          className="h-[80%] mx-8 p-8 rounded-md"
          style={{ backgroundColor: "rgba(14, 217, 208, 0.30)" }}
        >
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              placeholder="Please enter your full name"
              className="mb-4"
            />
            <input
              type="text"
              placeholder="Email or phone number"
              className="mb-4"
            />
            <input type="text" placeholder="Password" className="mb-4" />
            <input
              type="text"
              placeholder="Confirm Password"
              className="mb-4"
            />
            <button>Sign Up</button>
          </div>
          <p>Or</p>
          <div className="flex flex-col justify-center items-center">
            <button className="">
              {" "}
              <img src="./google_icon.png" alt="w-8 h-8" /> Continue with Google
            </button>
          </div>
        </div>
        <div className="h-screen">
          <img src="./login-signup_image.jpg" alt="h-full w-full" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
