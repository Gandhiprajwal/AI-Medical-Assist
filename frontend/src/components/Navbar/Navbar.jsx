import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

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
    <nav className="h-20 bg-white flex justify-between items-center px-4 shadow-md w-full">
      {/* Left Section (Logo & Title) */}
      <motion.div
        className="flex flex-row items-center md:w-1/3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to="/">
          <img
            src="https://s3-alpha-sig.figma.com/img/0f12/6f7d/97d9f3a49b4fe11b53b4752cde1f8282?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j8c9IbcyDponle~WyjPcXYeiCFej0jcdnaSOINl6i7ZsBFC4HdnRL6478lHKlC5glkDaoqASZ8q35FsB~8cAMQbp6yq93Rdd5VAt6ZpgJbhZ2T5fckopOy6yXBYlLukG-HLquxeMTej6Q18~ecTwHraGFBv2LghR5321~x6iu28dTzLQ~OKqXcYJQga7zNwg3VYsD5BHolc3aGZ5VEnNa~T9h-freODyjkIJJ~xij~BgEZ9yLKdtoXxmGKpAUTG7Gbs9mAyrqrh5fniFWpgzqB9Fv~6pggs56y-tU~-s~apFnnvh8UoAYN~7Cf~xOfAYVk~mIlhEdU8uBIL-m1x89A__"
            alt="AI Medical Assist Logo"
            className="w-12 md:w-16"
          />
        </Link>
        <motion.div
          className="ml-2 md:hidden lg:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-xs md:text-sm text-gray-500 text-center">
            WELCOME TO
          </p>
          <p className="text-sm md:text-md font-semibold">
            <span className="text-[#2E93B1]">AI</span>{" "}
            <span className="text-[#0C8667]">MEDICAL</span>{" "}
            <span className="text-[#2E93B1]">ASSIST</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Center Section (Navigation Links) */}
      <div className="hidden md:flex justify-center w-full">
        <motion.div
          className="w-full flex flex-row justify-center lg:gap-12 gap-8 bg-gray-100 p-2 rounded-lg"
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
                    key={index}
                    className={`text-gray-600  ${
                      location.pathname === item
                        ? "font-semibold border-b-2 border-green-700 text-green-700"
                        : "hover:border-b-2 hover:border-gray-400"
                    } px-2 text-sm md:text-md`}
                  >
                    {labels[index]}
                  </Link>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>

      {/* Right Section (Button) */}
      <div className="md:w-1/3 flex justify-end">
        <motion.div
          className="hidden md:block relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            to={buttonText === "Sign In" ? "/sign-in" : "/sign-up"}
            className={`text-white px-4 py-2 rounded-md text-md shadow-md font-medium transition-all relative overflow-hidden ${
              buttonText === "Sign In"
                ? "bg-[#2E93B1] hover:bg-[#257F96]"
                : "bg-[#54A4AF] hover:bg-[#54A4AF]"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={buttonText} // Re-renders on text change
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {buttonText}
              </motion.span>
            </AnimatePresence>
          </Link>
        </motion.div>
        {/* Mobile Menu Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-gray-700 ml-4"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </motion.button>
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
                  className={`py-2 text-gray-600 hover:border-b-4 hover:border-gray-500  text-center ${
                    location.pathname === item
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
