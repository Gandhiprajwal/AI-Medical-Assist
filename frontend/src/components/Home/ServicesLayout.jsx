import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Gradient Background with Hover Effect
const GradientBackground = styled(motion.div)`
  background: linear-gradient(
    270deg,
    rgba(14, 217, 208, 0.09) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease-in-out;
  border-radius: 10px;
  z-index: 10;
  &:hover {
    background: linear-gradient(
      270deg,
      rgba(14, 217, 208, 0.2) 0%,
      rgba(255, 255, 255, 0.5) 100%
    );
  }
`;

// Framer Motion Animations for Cards
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const ServiceCard = ({ title, description, url, img, className, direction }) => (
  <GradientBackground
    as={motion.div}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    whileHover="hover"
    custom={direction}
  >
    <div
      className={`dark:bg-gradient-to-b dark:from-[#0C8667] dark:via-[#042E23] dark:to-[#000000] h-[20rem] lg:max-w-[30rem] lg:max-h-[18rem] flex gap-2 border-2 border-white rounded-md shadow-2xl ${className}`}
    >
      <div className="text-white w-[60%] px-4 py-4 flex flex-col justify-center gap-4">
        <h1 className="py-2 flex md:gap-2 items-center text-white text-lg md:text-md font-light">
          {title} <FaArrowRight className="text-white" />
        </h1>
        <p className="font-extralight text-xs">{description}</p>
        <Link
          to={url}
          className="underline-offset-2 underline text-xs md:text-sm"
        >
          [Click here to check your risk]
        </Link>
      </div>
      <div className="w-[40%]">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-fill md:h-fill md:object-center rounded-r-md z-0"
        />
      </div>
    </div>
  </GradientBackground>
);

const ServicesLayout = ({ services }) => {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Background Plus Symbol Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src="./hospital-symbol.png"
          alt="Hospital Symbol"
          className="w-[400px] h-[400px] opacity-50 hidden lg:block"
        />
      </motion.div>

      {/* Clickable Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <Link
          to="/more-analyzers"
          className="bg-white dark:bg-green-900 dark:text-white hover:cursor-pointer text-black py-2 px-4 rounded-md font-semibold shadow-lg"
        >
          More AI Disease Analyzer
        </Link>
      </motion.div>

      {/* Services Cards Layout */}
      <div className="relative flex flex-wrap items-center justify-center w-full">
        <div className="flex flex-wrap items-center gap-16 w-full">
          {/* Left side cards */}
          <div className="flex flex-col lg:flex-row lg:justify-evenly gap-20 md:gap-30 w-full">
            <ServiceCard {...services[0]} direction="left" />
            <ServiceCard {...services[1]} direction="right" />
          </div>
          {/* Empty center space */}
          <div className="w-32" /> {/* Adjust spacing between card columns */}
          {/* Right side cards */}
          <div className="flex flex-col lg:flex-row lg:justify-evenly gap-20 md:gap-30 w-full">
            <ServiceCard {...services[2]} direction="left" />
            <ServiceCard {...services[3]} direction="right" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesLayout;
