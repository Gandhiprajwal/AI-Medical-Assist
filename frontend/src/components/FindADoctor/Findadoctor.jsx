import React from "react";
import { Search,Star, MapPin } from "lucide-react";
import doctorImage from "../../assets/ProfilePic1.png"; 

const Card = ({ image, specialistType, fullName, rating, location }) => (
    <div className="bg-white shadow-md rounded-lg p-4 h-61 flex flex-col items-center hover:drop-shadow-lg hover:scale-103">
         {/* Profile Picture */}
    <img
      src={image}
      alt={fullName}
      className="w-24 h-24 rounded-lg mb-1 object-cover"
    />

    {/* Specialist Type */}
    <p className="text-sm text-gray-500">{specialistType}</p>

    {/* Full Name */}
    <h2 className="text-lg font-semibold">{`Dr. ${fullName}`}</h2>

    <div className="flex gap-4 mb-2">
    {/* Rating */}
    {rating ? (
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-500 mr-1" />
        <span className="text-sm text-gray-500">{rating} Star</span>
      </div>
    ) : (
      <p className="text-sm text-gray-400 ">No Rating</p>
    )}

    {/* Location */}
    <div className="flex items-center text-sm text-gray-500">
      <MapPin className="w-4 h-4 mr-1" />
      <span>{location}</span>
    </div>
    </div>

    {/* Book Appointment Button */}
    <button
      className="bg-[#2E93B1] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] transition hover:cursor-pointer"
    >
      Book an Appointment
    </button>
    </div>
);

const Findadoctor = () => {
      // Mock Data Array
  const doctors = [
    {
      image: "ProfilePic1.png",
      specialistType: "General Physician",
      fullName: "John Doe",
      rating: "4.4",
      location: "Delhi",
    },
    {
      image: doctorImage,
      specialistType: "General Physician",
      fullName: "Amit Mishra",
      rating: null,
      location: "Delhi",
    },
    {
      image: "https://via.placeholder.com/100",
      specialistType: "Pediatrician",
      fullName: "Emily Davis",
      rating: "4.8",
      location: "Bangalore",
    },
    {
        image: "ProfilePic1.png",
        specialistType: "General Physician",
        fullName: "John Doe",
        rating: "4.4",
        location: "Delhi",
      },
      {
        image: doctorImage,
        specialistType: "General Physician",
        fullName: "Amit Mishra",
        rating: null,
        location: "Delhi",
      },
      {
        image: "https://via.placeholder.com/100",
        specialistType: "Pediatrician",
        fullName: "Emily Davis",
        rating: "4.8",
        location: "Bangalore",
      },
  ];
    return (
        <section className="flex">
            {/* Scrollable Grid */}
            <div className="w-full h-132 overflow-y-auto py-3 px-6 bg-[#81B4B2]">
                <div className="grid grid-cols-3 gap-4">
                {doctors.map((doctor, index) => (
            <Card key={index} {...doctor} />
          ))}
                </div>
            </div>
            <div className="bg-[#A5DFE3] w-1/3 h-full px-4 py-6 text-white">
                <div className="w-full h-120 bg-[#7ca7aa] flex flex-col px-6 py-4 gap-4 items-center rounded-lg overflow-auto">
                    <div className="relative w-full">
                        <input
                            className="w-full bg-white rounded-lg text-sm py-2 text-slate-400 px-12 outline-none"
                            type="text"
                            placeholder="Search for a specialist"
                        />
                        <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <small>Find doctors by speciality</small>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">General & Primary Care</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Heart & Circulatory System</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Brain & Nervous System</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Digestive System & Liver</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Kidney & Urinary System</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Lungs & Respiratory System</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Bones, Muscles & Joints</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Diabetes & Hormonal Disorders</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Skin, Hair & Nails</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Infections & Immune System</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Eyes & Vision</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Mental Health & Behavior</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Women's Health & Pregnancy</li>
                        <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2">Children’s Health</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
export default Findadoctor;
