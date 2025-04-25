import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import USP from "../../components/Home/USP";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import Services from "../../components/Home/Services";
import ServicesLayout from "../../components/Home/ServicesLayout";
import DoctorImageHomePage from "../../assets/doctor-image.png"
import DoctorImageHomePage2 from "../../assets/doctor-image-2.png"
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
      title: "Skin Disease Analyzer",
      description:
        "Skin diseases like monkeypox, chickenpox, and others can cause rashes, blisters, itching, and fever. Early detection is crucial for proper treatment and to prevent spreading. Use AI to analyze symptoms and check your risk for common skin infections.",
      url: "/skin-disease-analyzer",
      img: "./skin-disease.png",
    },
    {
      title: "Dengue Fever Analyzer",
      description:
        "Dengue fever is a mosquito-borne viral infection caused by the dengue virus. Common symptoms include high fever, severe headache, joint and muscle pain, rash, and fatigue. If not managed properly, it can lead to serious complications. Check your symptoms and risk with AI.",
      url: "/dengue-fever-analyzer",
      img: "./dengue-fever.png",
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
            className="h-fit md:h-2/3 w-full rounded-lg px-4 flex pb-8 pt-10 bg-[#0ED9D0]/30 dark:bg-[#000000]/65"
            style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}
          >
            <div className="flex flex-col md:px-20 md:py-10">
              {/* Title Section */}
              <div className="text-center lg:text-left">
                <h1 className="text-xl py-2 md:text-2xl md:pt-8 font-bold">
                  <span className="text-[#2E93B1]">
                    AI Health Check: Get Predictions
                  </span>{" "}
                  <span className="text-white">& Consult a Doctor!</span>
                </h1>
              </div>

              {/* Mobile Image */}
              <div className="pb-4 z-2 lg:hidden flex items-center opacity-70 mt-8 justify-center" >
              <img src={DoctorImageHomePage2} className="lg:hidden"/>
              </div>

              {/* Description Section */}
              <div className="md:text-left lg:w-2/3 py-8">
                <p className="text-justify text-white text-xs md:text-sm">
                  Wondering about your symptoms? Our AI-powered system helps you
                  get quick health predictions based on your inputs. Simply enter
                  your symptoms, and our AI will analyze them to provide possible
                  insights. If needed, you can easily consult a doctor for expert
                  advice. Get started now and take control of your health!
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex gap-2 lg:gap-6 justify-center lg:justify-start">
                <Link to="/predict-health" className="px-1 md:px-2 py-4 text-sm md:text-md bg-[#2E93B1] transition dark:bg-[#2E93B1]/80 hover:opacity-60 text-white md:px-8 md:py-4 rounded-md hover:scale-105 text-center lg:text-start" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)", }}>
                  Get AI Health Prediction
                </Link>
                <Link to="/find-a-doctor" className="px-1 md:px-2 py-4 text-sm md:text-md transition hover:opacity-60 bg-[#0C8667] dark:bg-[#0C8667]/70 text-white md:px-8 md:py-4 rounded-md hover:scale-105 text-center lg:text-start" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.32)", }}>
                  Book a Doctor Appointment
                </Link>
              </div>
            <img src={DoctorImageHomePage} className="hidden lg:block absolute bottom-1 right-0" alt="doctor-image" style={{
              objectFit: "cover",
              width: "35%",
              height: "70%",
            }} />
            </div>
          </div>
        </div>
        <div
          className="w-full px-2 py-6 flex md:flex-wrap flex-col items-center dark:bg-[#000000] bg-[#ffffff]/80 md:gap-4 gap-8  justify-evenly md:flex-row z-index-5">
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
            className="py-4 gap-2 md:px-14 px-8 flex flex-col md:flex md:flex-row md:justify-between md:items-center dark:bg-[#16493C] bg-[#0ED9D0]/30">
            <div className="w-full md:w-1/4">
              <h2 className="p-2 text-xl md:p-2 text-white text-md text-center md:text-lg font-medium">
                AI Disease Analyzer:
              </h2>
            </div>
            <div className="w-full pb-4">
              <p className="text-white text-sm md:px-2 md:py-4 md:text-md text-justify">
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
          <div className="dark:bg-gradient-to-b dark:from-[#0C8667] dark:via-[#000000] dark:to-[#286d7c] flex flex-col justify-center md:justify-between items-center px-8 py-16 md:px-20 md:w-full">
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
