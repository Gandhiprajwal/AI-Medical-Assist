import React, { useState } from "react";
import DoctorGrid from "./DoctorGrid"
import DoctorDetails from "./DoctorDetails"
import doctorImage from "../../assets/ProfilePic1.png"; // Import the doctor image

//Array of dummy data of different doctors for frontend showcase.
const doctors = [
  {
    id: 1,
    image: doctorImage,
    specialistType: "General Physician",
    fullName: "Amit Mishra",
    rating: "4.5",
    location: "Delhi",
    about: "Dr. Amit Mishra is an experienced General Physician with 10+ years of practice. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    keyPoints: ["Diabetes Management", "Hypertension Treatment", "Preventive Care", "Lorem ipsum dolor sit amet", "Consectetur adipiscing elit"],
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "4.8",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
  {
    id: 3,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
  {
    id: 4,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "4.8",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
  {
    id: 5,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "4.8",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
  {
    id: 6,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "4.8",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
  {
    id: 7,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "4.8",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
  {
    id: 8,
    image: "https://via.placeholder.com/100",
    specialistType: "Pediatrician",
    fullName: "Emily Davis",
    rating: "4.8",
    location: "Bangalore",
    about: "Dr. Emily Davis specializes in child healthcare and vaccinations.",
    keyPoints: ["Child Growth Monitoring", "Immunizations", "Nutritional Guidance"],
  },
];

const Findadoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return selectedDoctor ? (
    <DoctorDetails selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />
  ) : (
    <DoctorGrid doctors={doctors} setSelectedDoctor={setSelectedDoctor} />
  );
};

export default Findadoctor;
