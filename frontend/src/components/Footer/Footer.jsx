import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-18 h-auto bg-white flex flex-col justify-center items-center gap-4 relative py-6 pb-4">
      {/* Logo and Navigation Links Section */}
      <div className="flex flex-col w-full">
        {/* Logo and Brand Name */}
        <div className="flex items-end gap-2 pt-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <img src="./logo.png" alt="logo" className="h-10 md:h-12" />
            <p className="text-sm md:text-md font-semibold">
              <span className="text-[#2E93B1]">AI</span>{" "}
              <span className="text-[#0C8667]">MEDICAL</span>{" "}
              <span className="text-[#2E93B1]">ASSIST</span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap sm:flex-row sm:justify-between  text-[#2E93B1] text-sm md:text-md w-full">
          <div className="list-none flex flex-col gap-3 justify-end pb-8 border-r-2 w-1/3">
            <Link to="/">
              <li className="py-2 underline-offset-2 underline">Home</li>
            </Link>
            <Link to="/predict-health">
              <li className="py-2 underline-offset-2 underline">Predict Health</li>
            </Link>
            <Link to="/disease-analyzer">
              <li className="py-2 underline-offset-2 underline">Disease Analyzer</li>
            </Link>
            <Link to="/find-doctor">
              <li className="py-2 underline-offset-2 underline">Find a Doctor</li>
            </Link>
          </div>

          <div className="list-none flex flex-col gap-4 justify-end pb-8">
            <Link to="/heart-disease-analyzer">
              <li className="py-2 underline-offset-2 underline">Heart: Disease Analyzer</li>
            </Link>
            <Link to="/kidney-disease-analyzer">
              <li className="py-2 underline-offset-2 underline">Kidney: Disease Analyzer</li>
            </Link>
            <Link to="/liver-disease-analyzer">
              <li className="py-2 underline-offset-2 underline">Liver: Disease Analyzer</li>
            </Link>
            <Link to="/malaria-disease-analyzer">
              <li className="py-2 underline-offset-2 underline">Malaria: Disease Analyzer</li>
            </Link>
          </div>

          {/* Email and Suggestion Form */}
          <div className="flex flex-col gap-4 border-l-2 w-1/3 pl-16">
            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 px-4 py-2 rounded-md border-[#0c86678a] focus:outline-none focus:ring-1 focus:ring-[#0c86678a] focus:border-[#0c86678a] text-black"
            />
            <textarea
              cols="25"
              rows="5"
              className="border-2 rounded-md border-[#0c86678a] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#0c86678a] focus:border-[#0c86678a] text-black"
              placeholder="Have any suggestions? Tell us more!"
            ></textarea>
            <button className="cursor-pointer border-1 border-black w-1/2 mx-auto bg-[#64b7d3] text-white px-4 py-3 rounded-md hover:opacity-85 transition-all duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Centered Border Inside Footer */}
      <div className="mt-8 w-full border-t-2 border-[#2E93B1]"></div>

      {/* Copyright & Policies Section */}
      <div className="text-sm flex flex-col-reverse justify-between items-center md:flex-row md:justify-center md:text-md md:gap-4 text-[#0C8667]">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} AI Medical Assist. All Rights Reserved.
        </p>
        <span className="hidden md:inline">|</span>

        {/* Navigation Links */}
        <p className="text-sm flex flex-row items-center gap-4">
          <Link to="/privacy-policy" className="hover:text-[#2E93B1]" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
          <span className="md:inline">|</span>
          <Link to="/terms-of-service" className="hover:text-[#2E93B1]" aria-label="Terms of Service">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
