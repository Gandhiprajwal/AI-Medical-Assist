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
    <nav className="h-20 bg-white dark:bg-[#000000] flex justify-between items-center px-8 drop-shadow-md w-full">
      {/* Left Section (Logo & Title) */}
      <motion.div
        className="flex flex-row items-center md:w-1/3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to="/" className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-10 md:w-10"
          />
          <motion.div
            className="md:hidden lg:block"
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
      <div className="hidden md:flex justify-center w-full">
        <motion.div
          className="w-full dark:bg-[#45494a]/30 flex flex-row justify-center lg:gap-12 gap-8 bg-gray-100 p-2 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {["/", "/predict-health", "/find-a-doctor", "/feedback"].map(
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
            className="text-white px-8 py-2 rounded-md text-md shadow-md font-medium transition-all dark:bg-[#286D7C] bg-[#2E93B1] hover:bg-[#257F96] flex items-center space-x-2 whitespace-nowrap"
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
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence></AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {["/", "/predict-health", "/find-a-doctor", "/feedback"].map(
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
                  className={`py-2 text-gray-600 hover:border-b-4 hover:border-gray-500  text-center ${location.pathname === item
                    ? "font-semibold border-b-4 border-green-700 text-green-700"
                    : ""
                    }`}
                >
                  <Link to={item} key={index} onClick={() => setIsOpen(false)}>
                    {labels[index]}
                  </Link>
                </motion.div>
              );
            }
          )}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/sign-in"
              className="bg-[#2E93B1] text-white px-6 py-2 rounded-md text-md font-medium "
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {buttonText}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
