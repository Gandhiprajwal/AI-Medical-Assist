import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GradientBackground = styled.div`
  background: linear-gradient(
    270deg,
    rgba(14, 217, 208, 0.09) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  display: flex; /* Ensures child elements align properly */
  align-items: center;
  justify-content: center;
`;

const Card = ({ title, description, url, img, disabled }) => {
    return (
        <GradientBackground>
            {" "}
            {/* ✅ Now the gradient is applied */}
            <div className={`dark:bg-gradient-to-b dark:from-[#0C8667] dark:via-[#042E23] dark:to-[#000000] bg-gradient-to-b from-[#0C8667] via-[#042E23] to-[#000000] w-[30rem] h-[16rem] flex gap-2 border-2 border-white rounded-md shadow-2xl ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                <div className="text-white w-[60%] px-4 py-4 flex flex-col justify-center gap-4">
                    <h1 className="py-2 flex gap-2 items-center text-white text-md font-light">
                        {title} <FaArrowRight className="text-white" />
                    </h1>
                    <p className="font-extralight text-xs">{description}</p>
                    {!disabled ? (
                        <Link to={url} className="underline-offset-2 underline text-sm">
                            [Click here to check your risk]
                        </Link>
                    ) : (
                        <p className="text-gray-400 text-xs">This analyzer is currently unavailable.</p>
                    )}
                </div>
                <div className="w-[40%]">
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-[15.8rem] object-center rounded-r-md"
                    />
                </div>
            </div>
        </GradientBackground>
    );
};

export default Card;
