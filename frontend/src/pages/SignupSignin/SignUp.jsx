import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const newErrors = {};

    // Full Name Validation
    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      newErrors.fullName = "Full name can only contain letters and spaces.";
    }

    // Email or Phone Number Validation
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Email or phone number is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(emailOrPhone) && // Validate email format
      !/^\+91\d{10}$/.test(emailOrPhone) // Validate phone number format starting with +91
    ) {
      newErrors.emailOrPhone =
        "Invalid email format or phone number should start with +91 and be 10 digits long.";
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])/.test(password) || // Checks for at least one capital letter
      !/(?=.*[0-9])/.test(password) || // Checks for at least one number
      !/(?=.*[@#$])/.test(password) || // Checks for at least one special character (@, #, $)
      password.length < 6 // Checks for minimum length of 6 characters
    ) {
      newErrors.password =
        "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character (@, #, $).";
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("Form submitted successfully!");
      // Add actual sign-up logic here
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen">
        <div className="w-full h-screen lg:w-1/2 p-10 dark:bg-black flex justify-center items-center">
          <form
            className="w-full rounded-2xl h-fit drop-shadow-lg max-w-md"
            style={{
              backgroundColor: "rgba(14, 217, 208, 0.30)",
              boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.55)",
            }}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-center items-center pt-8 pb-4 px-8 gap-4">
              <p className="text-gray-700 dark:text-white text-sm">
                Hi, create your account here...
              </p>
              <input
                type="text"
                placeholder="Please enter your full name"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">{errors.fullName}</span>
              )}
              <input
                type="text"
                placeholder="Email or phone number"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              {errors.emailOrPhone && (
                <span className="text-red-500 text-xs">
                  {errors.emailOrPhone}
                </span>
              )}
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 rounded-lg dark:text-white text-gray-400 bg-white dark:bg-black/40 drop-shadow-lg text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </span>
              )}
              <button
                type="submit"
                className="cursor-pointer py-3 w-full rounded-md bg-[#409FB6] text-white text-sm md:text-lg drop-shadow-md hover:bg-[#338096]/70"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-gray-400 pb-4">Or</p>
            <div className="flex flex-col justify-center items-center px-8">
              <Link
                className="w-full flex items-center justify-center gap-4 cursor-pointer bg-white px-8 py-2 mb-4 rounded-lg text-xs md:text-sm"
                to={"/"}
              >
                <img src="./google_icon.png" className="md:w-8 md:h-8 w-6 h-6" alt="Google Icon" />
                Continue with Google
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="./login-signup_image.jpg"
            className="h-full w-full relative"
            alt="Sign Up Banner"
          />
          <div className="p-8 py-12 text-white absolute top-0 hidden lg:block lg:w-1/2 h-full dark:bg-black/75 bg-[#2E93B1]/75">
            <h2 className="text-3xl font-semibold">WELCOME TO</h2>
            <h3 className="text-3xl font-semibold pb-8">
              AI MEDICAL ASSIST WEB APP!
            </h3>
            <p className="text-justify pb-8">
              Wondering about your symptoms? AI Medical Assist makes it easy to
              check your health from the comfort of your home! Simply enter
              your symptoms, and our AI-powered system will analyze them to
              provide instant health insights. Whether it’s a minor concern or
              something that needs attention, our platform helps you make
              informed decisions.
            </p>
            <p className="text-justify pb-8">
              If needed, you can also book an appointment with a doctor for
              expert advice—all in just a few clicks! Our AI technology ensures
              quick, reliable, and secure health predictions, helping you take
              the first step toward better healthcare.
            </p>
            <div className="flex items-center gap-2 pb-2">
              <img src="./green_tick.png" alt="Green Tick" className="w-6 h-6" />
              <p className="text-2xl font-thin">Your smart health companion.</p>
            </div>
            <div className="flex items-center gap-2 pb-2">
              <img src="./green_tick.png" alt="Green Tick" className="w-6 h-6" />
              <p className="text-2xl font-thin">Seamless AI and Doctor support.</p>
            </div>
            <div className="flex items-center gap-2 pb-2">
              <img src="./green_tick.png" alt="Green Tick" className="w-6 h-6" />
              <p className="text-2xl font-thin">Try for free today!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-400"></div>
    </>
  );
};

export default SignUp;
