import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Logo.png";
import Logo2 from "../../assets/Logo-removebg.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [buttonText, setButtonText] = useState("Sign In");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setButtonText((prev) => (prev === "Sign In" ? "Sign Up" : "Sign In"));
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <nav className="relative z-50 h-20 bg-white dark:bg-[#000000] flex justify-between items-center px-6 drop-shadow-md sm:px-4 md:px-8 gap-4 w-full">
      {/* Left Section (Logo & Title) */}
      <motion.div
        className="flex flex-row items-center sm:w-auto md:w-1/3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to="/" className="flex items-center gap-4 ">
          <img
            src={Logo}
            alt="Logo"
            className="w-10 sm:w-10"
          />
          <motion.div
            className="md:hidden lg:block sm:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-sm md:text-md font-semibold">
              <span className="text-[#2E93B1]">AI</span>{" "}
              <span className="text-[#0C8667]">MEDICAL</span>{" "}
              <span className="text-[#2E93B1]">ASSIST</span>
            </p>
          </motion.div>
        </Link>

      </motion.div>
      {/* Center Section (Navigation Links) */}
      <div className="hidden md:flex justify-center w-full md:mr-12 lg:mr-0">
        <motion.div
          className="w-full dark:bg-[#45494a]/30 flex flex-row justify-center md:gap-8 lg:gap-12 bg-gray-100 p-2 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {["/", "/predict-health", "/find-a-doctor"].map(
            (item, index) => {
              const labels = [
                "Home",
                "Predict Health",
                "Find a Doctor",
              ];
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item}
                    className={`text-gray-600 ${location.pathname === item
                      ? "font-semibold dark:text-[#48A9C5] text-green-700"
                      : "dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-400"
                      } text-sm md:text-md`}
                  >
                    <span
                      className={`border-b-2 ${location.pathname === item
                        ? "dark:border-[#48A9C5] border-green-700"
                        : "hover:border-gray-400 border-transparent"
                        }`}
                    >
                      {labels[index]}
                    </span>
                  </Link>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>

      {/* Right Section (Button) */}
      <div className="md:w-1/3 flex justify-end">
        <div
          className="hidden md:block relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="text-white md:px-2 sm:px-4 py-2 rounded-md text-sm md:text-md shadow-md font-medium transition-all bg-[#2E93B1] dark:bg-[#286D7C] hover:bg-[#257F96] flex items-center space-x-1 "
          >
            {/* Sign In Link */}
            <Link
              to="/sign-in"
              className="text-center flex items-center justify-center hover:scale-110 transition-transform"
            >
              <span className="text-sm font-medium">Sign In</span>
            </Link>

            {/* Divider */}
            <span className="text-white ">/</span>

            {/* Sign Up Link */}
            <Link
              to="/sign-up"
              className="text-center flex items-center justify-center hover:scale-110 transition-transform"
            >
              <span className="text-sm font-medium">Sign Up</span>
            </Link>
          </div>
        </div>
        {/* Mobile Menu Icon */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 dark:text-white">
          {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>


      {/* Mobile Navigation Menu */}
      <AnimatePresence></AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute h-fit pb-6 top-20 right-0 w-full bg-white dark:bg-black shadow-lg flex flex-col items-start pl-6 md:hidden gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {["/", "/predict-health", "/find-a-doctor"].map(
            (item, index) => {
              const labels = [
                "Home",
                "Predict Health",
                "Find a Doctor",
                "Feedback",
              ];
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-600 text-center ${location.pathname === item
                    ? "font-semibold dark:text-[#48A9C5] text-green-700"
                    : "dark:text-gray-400 "
                    }`}
                >
                  <Link to={item} key={index} onClick={() => setIsOpen(false)}>
                    {labels[index]}
                  </Link>
                </motion.div>
              );
            }
          )}
          <div
            className="text-white px-6 sm:px-4 py-2 rounded-md text-sm md:text-md shadow-md font-medium transition-all bg-[#2E93B1] dark:bg-[#286D7C] hover:bg-[#257F96] flex items-center space-x-2"
          >
            {/* Sign In Link */}
            <Link
              to="/sign-in"
              className="text-center flex items-center justify-center hover:scale-110 transition-transform"
            >
              <span className="text-sm font-medium">Sign In</span>
            </Link>

            {/* Divider */}
            <span className="text-white">/</span>

            {/* Sign Up Link */}
            <Link
              to="/sign-up"
              className="text-center flex items-center justify-center hover:scale-110 transition-transform"
            >
              <span className="text-sm font-medium">Sign Up</span>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
