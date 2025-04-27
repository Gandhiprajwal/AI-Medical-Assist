import React from "react";
import MoreAICard from "../MoreAIDiseaseAnalyzer/MoreAICard";
const MoreAIDiseaseAnalyzer = () => {
    const cardsData = [
        { title: "Heart Disease Analyzer", description: "Heart disease occurs due to factors like high blood pressure...", url: "/heart-disease-analyzer", img: "./heart-img.png", disabled: false },
        { title: "Liver Disease Analyzer", description: "Liver disease can be caused by viral infections, excessive alcohol...", url: "/liver-disease-analyzer", img: "./liver-img.png", disabled: false },
        { title: "Skin Disease Analyzer", description: "Skin diseases like monkeypox, chickenpox...", url: "/skin-disease-analyzer", img: "./skin-disease.png", disabled: false },
        { title: "Dengue Fever Analyzer", description: "Dengue fever is a mosquito-borne viral infection...", url: "/dengue-fever-analyzer", img: "./dengue-fever.png", disabled: false },

        {
            title: "Diabetes Risk Analyzer",
            description: "Diabetes is a metabolic disorder caused by high blood sugar levels due to insulin resistance or deficiency. Early detection and lifestyle adjustments can help manage the risk effectively.",
            url: "/diabetes-risk-analyzer",
            img: "./diabetes-image.avif",
            disabled: true
        },
        {
            title: "Kidney Disease Analyzer",
            description: "Kidney diseases can result from high blood pressure, diabetes, infections, or genetic disorders. Detecting it early helps prevent complications like kidney failure.",
            url: "/kidney-disease-analyzer",
            img: "./kidney-img.png",
            disabled: true
        },
        {
            title: "Stroke Risk Analyzer",
            description: "Strokes occur due to interrupted blood flow to the brain, often caused by high blood pressure, cholesterol, or clotting disorders. Early assessment can help reduce risk factors.",
            url: "/stroke-risk-analyzer",
            img: "./stroke-image.jpg",
            disabled: true
        },
    ];
    
    return (
        <section className="h-auto w-full bg-cover dark:bg-[#000000] bg-center flex flex-col items-center justify-center md:px-16 px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ backgroundImage: `url('/image3.png')` }}>
            {cardsData.map((card, index) => (
                <MoreAICard 
                    key={index}
                    title={card.title}
                    description={card.description}
                    url={card.url}
                    img={card.img}
                    disabled={card.disabled}
                />
            ))}
        </section>
    );
};

export default MoreAIDiseaseAnalyzer;