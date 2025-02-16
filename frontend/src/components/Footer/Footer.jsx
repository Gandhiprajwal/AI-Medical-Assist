import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="h-16 text-sm py-2 flex flex-col-reverse justify-between items-center md:flex-row md:justify-center md:text-md md:py-0 md:h-12 md:gap-4 text-[#0C8667] bg-gray-100">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AI Medical Assist. All Rights
          Reserved.
        </p>
        <span className="hidden md:inline">| </span>
        <p className="text-sm flex flex-row gap-4 justify-between items-center">
          <Link className="hover:text-[#2E93B1]">Privacy Policy</Link> |{" "}
          <Link className="hover:text-[#2E93B1]">Terms of Service</Link>
        </p>
      </footer>
    </>
  );
};

export default Footer;
