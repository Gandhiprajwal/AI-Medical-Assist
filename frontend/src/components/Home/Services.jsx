import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

// ✅ Corrected GradientBackground
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

// ✅ Styled Image Component
// const StyledImage = styled.img`
//   background: url(${(props) => props.bg}) lightgray -0.239px 0px / 117.952% 100%
//     no-repeat;
//   width: 100%;
//   display: block;
// `;

const Services = ({ title, description, url, img }) => {
  return (
    <GradientBackground>
      {" "}
      {/* ✅ Now the gradient is applied */}
      <div className="w-[30rem] h-[16rem] flex gap-2 border-2 border-white rounded-md shadow-2xl">
        <div className="text-white w-[60%] px-4 py-4 flex flex-col justify-center gap-4">
          <h1 className="py-2 flex gap-2 items-center text-white text-md font-light">
            {title} <FaArrowRight className="text-white" />
          </h1>
          <p className="font-extralight text-xs">{description}</p>
          <Link to={url} className="underline-offset-2 underline text-sm">
            [Click here to check your risk]
          </Link>
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

export default Services;
