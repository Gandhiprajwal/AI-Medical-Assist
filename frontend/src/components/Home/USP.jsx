import React from "react";
import { motion } from "framer-motion";

const USP = ({ img, title, textColor }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
      initial={{ opacity: 0, y: 30 }} // Start hidden, slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate in when visible
      viewport={{ once: true, amount: 0.3 }} // Trigger only once when 30% visible
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }} // Scale up slightly on hover
    >
      <motion.img
        src={img}
        alt={title}
        className="h-15 w-15 md:h-20 md:w-20 rounded-full"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.h1
        className="text-lg md:text-xl font-normal"
        style={{ color: textColor }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h1>
    </motion.div>
  );
};

export default USP;
