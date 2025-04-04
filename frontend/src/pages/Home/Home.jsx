import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import USP from "../../components/Home/USP";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import Services from "../../components/Home/Services";
import ServicesLayout from "../../components/Home/ServicesLayout";
import DoctorImageHomePage from "../../assets/doctor-image.png"
import Mainbgimg from "../../assets/mainbgimg2.png"

const GradientBackground = styled.div`
  background: linear-gradient(
    180deg,
    rgba(12, 134, 103, 0.7) 0%,
    rgba(46, 147, 177, 0.56) 100%
  );
`;

const Home = () => {
  const usp = [
    {
      img: "./health-companion.png",
      title: "Your Smart Health Companion",
      textColor: "#0C8680",
    },
    {
      img: "./doc-img.png",
      title: "Seamless AI & Doctor Support",
      textColor: "#2E93B1",
    },
    {
      img: "./free-trial.png",
      title: "Try for Free Today!",
      textColor: "rgb(141, 138, 138)",
    },
  ];
  const services = [
    {
      title: "Heart Disease Analyzer",
      description:
        "Heart disease occurs due to factors like high blood pressure, cholesterol, obesity, smoking, and an unhealthy lifestyle. It can lead to serious conditions like heart attacks and strokes. Early detection can help in taking preventive measures.",
      url: "/heart-disease-analyzer",
      img: "./heart-img.png",
    },
    {
      title: "Liver Disease Analyzer",
      description:
        "Liver disease can be caused by viral infections (Hepatitis), excessive alcohol consumption, obesity, and genetic factors. It affects the liver’s ability to filter toxins and process nutrients. Detecting it early can prevent serious complications.",
      url: "/liver-disease-analyzer",
      img: "./liver-img.png",
    },
    {
      title: "Kidney Disease Analyzer",
      description:
        "Kidney disease often results from diabetes, high blood pressure, infections, or prolonged use of certain medications. It can lead to kidney failure if not detected early. Checking your risk can help in managing the condition better.",
      url: "/kidney-disease-analyzer",
      img: "./kidney-img.png",
    },
    {
      title: "Malaria Disease Analyzer",
      description:
        "Malaria is a mosquito-borne disease caused by Plasmodium parasites. Symptoms include high fever, chills, sweating, and fatigue. If left untreated, it can become life-threatening. Check your symptoms and risk with AI.",
      url: "/malaria-disease-analyzer",
      img: "./malaria-img.png",
    },
  ];
  return (
    <>
      <div className="w-full">
        <div className="h-full px-5 dark:bg-[#000000] md:px-20 py-10 flex" style={{
          backgroundImage: `url(${Mainbgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
          <div
            className="md:h-2/3 w-full rounded-lg px-4 flex pb-8 pt-10 bg-[#0ED9D0]/30 dark:bg-[#000000]/65"
            style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}
          >
            <div className="flex flex-col md:px-20 md:py-10">
              {/* Title Section */}
              <div className="text-center md:text-left">
                <h1 className="text-xl py-2 md:text-2xl md:pt-8 font-bold">
                  <span className="text-[#2E93B1]">
                    AI Health Check: Get Predictions
                  </span>{" "}
                  <span className="text-white">& Consult a Doctor!</span>
                </h1>
              </div>

              {/* Mobile Image */}
              {/* <div className="pb-4 md:hidden">
                <img src="./doctor-image.png" alt="doctor-image" />
              </div> */}

              {/* Description Section */}
              <div className="md:text-left md:w-2/3 py-8">
                <p className="text-justify text-white text-xs md:text-sm">
                  Wondering about your symptoms? Our AI-powered system helps you
                  get quick health predictions based on your inputs. Simply enter
                  your symptoms, and our AI will analyze them to provide possible
                  insights. If needed, you can easily consult a doctor for expert
                  advice. Get started now and take control of your health!
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex gap-6 justify-center md:justify-start">
                <Link className="px-2 py-4 text-md bg-[#2E93B1] dark:bg-[#2E93B1]/80 hover:opacity-60 text-white md:px-8 md:py-4 rounded-md hover:scale-105" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)", }}>
                  Get AI Health Prediction
                </Link>
                <Link className="px-2 py-4 text-md hover:opacity-60 bg-[#0C8667] dark:bg-[#0C8667]/70 text-white md:px-8 md:py-4 rounded-md hover:scale-105" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)", }}>
                  Book a Doctor Appointment
                </Link>
              </div>
            <img src={DoctorImageHomePage} className="absolute bottom-1 right-0" alt="doctor-image" style={{
              objectFit: "cover",
              width: "35%",
              height: "70%",
            }} />
            </div>
          </div>
        </div>
        <div
          className="w-full px-2 py-6 flex flex-wrap justify-center dark:bg-[#000000] bg-[#ffffff]/80 justify-between gap-4 md:items-center md:justify-evenly md:flex-row z-index-5">
          {usp.map((item, key) => (
            <USP
              img={item.img}
              title={item.title}
              textColor={item.textColor}
              key={key}
            />
          ))}
        </div>
        <GradientBackground>
          <div
            className="py-4 gap-2 px-14 flex flex-col md:flex md:flex-row md:justify-between md:items-center dark:bg-[#16493C] bg-[#0ED9D0]/30">
            <div className="w-fit md:w-1/4">
              <h2 className="p-2 text-xl md:p-2 text-white text-md text-center md:text-lg font-medium">
                AI Disease Analyzer:
              </h2>
            </div>
            <div className="w-full">
              <p className="text-white text-sm px-2 md:py-4 md:text-md text-justify">
                Our trained AI models, built using advanced machine learning
                algorithms, help analyze specific diseases like heart disease,
                liver disease, kidney disease, and more. To use the model, first
                log in to your account, then simply click on the desired test
                and enter the required details. The AI will process your inputs
                and provide a risk analysis based on the given data.
              </p>
            </div>
          </div>
          <div
            className="border-4 border-[#0ED9D0]/30 border"></div>
          <div className="dark:bg-gradient-to-b dark:from-[#0C8667] dark:via-[#000000] dark:to-[#286d7c] flex flex-wrap flex-col justify-between items-center px-6 py-16 md:px-20 md:w-full">
            {/* {services.map((item, key) => (
              <Services
                title={item.title}
                description={item.description}
                url={item.url}
                img={item.img}
                key={key}
              />
            ))} */}
            {/* <div className="w-full"> */}
            <ServicesLayout services={services} />
            {/* </div> */}
          </div>
          {/* <div className="flex justify-center">
            <img src="./hospital-symbol.png" alt="" className=""/>
          </div> */}
        </GradientBackground>
      </div>
    </>
  );
};

export default Home;
