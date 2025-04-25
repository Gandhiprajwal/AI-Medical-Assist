import React from "react";
import { Star, MapPin } from "lucide-react";

const Card = ({ doctor, onBookAppointment }) => (
  <div className="bg-white dark:bg-[#000000] shadow-md rounded-lg p-4 h-61 flex flex-col items-center hover:drop-shadow-lg hover:scale-103">
    <img src={doctor.image} alt={doctor.fullName} className="dark:border dark:border-[#2E93B1] w-24 h-24 rounded-lg mb-1 object-cover" />
    <p className="text-sm text-gray-500">{doctor.specialistType}</p>
    <h2 className="text-lg dark:text-white font-semibold">{`Dr. ${doctor.fullName}`}</h2>
    <div className="flex gap-4 mb-2">
      {doctor.rating ? (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="text-sm text-gray-500">{doctor.rating} Star</span>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No Rating</p>
      )}
      <div className="flex items-center text-sm text-gray-500">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{doctor.location}</span>
      </div>
    </div>
    <button className="bg-[#2E93B1] dark:bg-[#286D7C] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] transition cursor-pointer" onClick={() => onBookAppointment(doctor)}>
      Book an Appointment
    </button>
  </div>
);

export default Card;
