import React, { useState } from "react";
import { Search } from "lucide-react";
import Card from "./Card";

const DoctorGrid = ({ doctors, setSelectedDoctor }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) => doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialistType.toLowerCase().includes(searchQuery.toLowerCase()) // Matching categories
  );
  return (
    <section className="flex flex-col-reverse md:flex-row">
      <div className="w-full h-132 overflow-y-auto py-3 md:px-6 px-12 dark:bg-[#000000]/88 bg-[#81B4B2]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor, index) => (
            <Card key={index} doctor={doctor} onBookAppointment={setSelectedDoctor} />
          ))}
        </div>
      </div>
      <div className="bg-[#A5DFE3] dark:bg-black dark:border-l dark:border-white w-full md:w-2/3 lg:w-1/3 md:h-full h-1/2 md:px-4 px-12 py-6 text-white">
        <div className="w-full h-38 md:h-120 bg-[#7ca7aa] dark:bg-gray-900 flex flex-col px-6 py-4 gap-4 items-center rounded-lg overflow-auto">
          <div className="relative w-full">
            <input className="w-full bg-white dark:bg-[#000000] dark:border dark:border-white dark:text-white rounded-lg text-sm py-2 text-slate-400 px-12 outline-none" type="text" placeholder="Search for specialist.." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
          </div>
          <small>Find doctors by speciality</small>
          <ul className="flex flex-col gap-4 text-sm">
            {[
              "General & Primary Care",
              "Heart & Circulatory System",
              "Brain & Nervous System",
              "Digestive System & Liver",
              "Kidney & Urinary System",
              "Lungs & Respiratory System",
              "Bones, Muscles & Joints",
              "Diabetes & Hormonal Disorders",
              "Skin, Hair & Nails",
              "Infections & Immune System",
              "Eyes & Vision",
              "Mental Health & Behavior",
              "Women's Health & Pregnancy",
              "Child Health"
            ].map((category, index) => (
              <li
                key={index}
                className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] dark:bg-[#286D7C] rounded-lg px-4 py-2"
                onClick={() => setSearchQuery(category)} // Clicking a category auto-filters
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DoctorGrid;
