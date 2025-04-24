import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="dark:bg-black border-t border-[#16493C] px-6 md:px-12 lg:px-18 py-6 bg-white flex flex-col items-center gap-6">
      {/* Top Section */}
      <div className="w-full flex flex-col gap-8">
        {/* Logo */}
        <div className="flex md:justify-start items-center gap-3">
          <img src="./logo.png" alt="logo" className="h-10 md:h-12" />
          <p className="text-sm md:text-md font-semibold">
            <span className="text-[#2E93B1]">AI</span>{" "}
            <span className="text-[#0C8667]">MEDICAL</span>{" "}
            <span className="text-[#2E93B1]">ASSIST</span>
          </p>
        </div>

        {/* Grid Layout for Content */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-md text-[#2E93B1]">
          {/* Column 1 */}
          <div className="flex flex-col gap-3 md:border-r md:pr-6">
            <Link to="/" className="underline underline-offset-2">Home</Link>
            <Link to="/predict-health" className="underline underline-offset-2">Predict Health</Link>
            <Link to="/find-a-doctor" className="underline underline-offset-2">Find a Doctor</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <Link to="/heart-disease-analyzer" className="underline underline-offset-2">Heart: Disease Analyzer</Link>
            <Link to="/skin-disease-analyzer" className="underline underline-offset-2">Skin: Disease Analyzer</Link>
            <Link to="/liver-disease-analyzer" className="underline underline-offset-2">Liver: Disease Analyzer</Link>
            <Link to="/dengue-fever-analyzer" className="underline underline-offset-2">Dengue: Fever Analyzer</Link>
          </div>

          {/* Column 3 - Suggestions */}
          <div className="flex flex-col gap-3 border-t border-t-0 md:border-l md:pl-6">
            <input
              type="text"
              placeholder="Enter your email"
              className="border px-4 py-2 rounded-md border-[#0c86678a] dark:border-white focus:outline-none focus:ring-1 focus:ring-[#0c86678a] text-black dark:text-white"
            />
            <textarea
              rows="4"
              placeholder="Have any suggestions? Tell us more!"
              className="border px-4 py-2 rounded-md border-[#0c86678a] dark:border-white focus:outline-none focus:ring-1 focus:ring-[#0c86678a] text-black dark:text-white"
            ></textarea>
            <button className="w-full md:w-1/2 mx-auto bg-[#64b7d3] dark:bg-[#286D7C] text-white px-4 py-2 rounded-md border border-black dark:border-white hover:opacity-85 transition-all duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t-2 border-[#2E93B1] mt-6"></div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[#0C8667]">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} AI Medical Assist. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-[#2E93B1]">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-of-service" className="hover:text-[#2E93B1]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
