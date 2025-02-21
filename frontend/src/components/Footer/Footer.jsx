import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="h-auto bg-white flex flex-col justify-center items-center gap-4 relative py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Logo and Navigation Links Section */}
      <motion.div
        className="flex flex-col w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Logo and Brand Name */}
        <div className="flex items-end gap-2 pt-2 px-16">
          <div className="flex flex-row items-center justify-center gap-2">
            <motion.img
              src="./logo.png"
              alt="logo"
              className="h-10 md:h-12"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="text-sm md:text-md font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#2E93B1]">AI</span>{" "}
              <span className="text-[#0C8667]">MEDICAL</span>{" "}
              <span className="text-[#2E93B1]">ASSIST</span>
            </motion.p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap sm:flex-row sm:justify-around px-16 text-[#2E93B1] text-sm md:text-md w-full">
          <motion.div
            className="list-none flex flex-col gap-4 justify-end pb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link to="/"><li className="py-2 underline-offset-2 underline">Home</li></Link>
            <Link to="/predict-health"><li className="py-2 underline-offset-2 underline">Predict Health</li></Link>
            <Link to="/disease-analyzer"><li className="py-2 underline-offset-2 underline">Disease Analyzer</li></Link>
            <Link to="/find-doctor"><li className="py-2 underline-offset-2 underline">Find a Doctor</li></Link>
          </motion.div>

          <motion.div
            className="list-none flex flex-col gap-4 justify-end pb-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link to="/heart-disease-analyzer"><li className="py-2 underline-offset-2 underline">Heart: Disease Analyzer</li></Link>
            <Link to="/kidney-disease-analyzer"><li className="py-2 underline-offset-2 underline">Kidney: Disease Analyzer</li></Link>
            <Link to="/liver-disease-analyzer"><li className="py-2 underline-offset-2 underline">Liver: Disease Analyzer</li></Link>
            <Link to="/malaria-disease-analyzer"><li className="py-2 underline-offset-2 underline">Malaria: Disease Analyzer</li></Link>
          </motion.div>

          {/* Email and Suggestion Form */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          >
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
            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Centered Border Inside Footer */}
      <motion.div
        className="w-[90%] border-t-2 border-[#2E93B1]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      ></motion.div>

      {/* Copyright & Policies Section */}
      <motion.div
        className="text-sm flex flex-col-reverse justify-between items-center md:flex-row md:justify-center md:text-md md:gap-4 text-[#0C8667] mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} AI Medical Assist. All Rights Reserved.
        </p>
        <span className="hidden md:inline">|</span>

        {/* Navigation Links */}
        <p className="text-sm flex flex-row items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/privacy-policy" className="hover:text-[#2E93B1]" aria-label="Privacy Policy">
              Privacy Policy
            </Link>
          </motion.div>

          <span className=" md:inline">|</span>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/terms-of-service" className="hover:text-[#2E93B1]" aria-label="Terms of Service">
              Terms of Service
            </Link>
          </motion.div>
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
