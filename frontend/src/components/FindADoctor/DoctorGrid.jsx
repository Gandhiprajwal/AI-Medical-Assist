import React from "react";
import { Search } from "lucide-react";
import Card from "./Card";

const DoctorGrid = ({ doctors, setSelectedDoctor }) => {
  return (
    <section className="flex">
      <div className="w-full h-132 overflow-y-auto py-3 px-6 dark:bg-[#000000]/88 bg-[#81B4B2]">
        <div className="grid grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <Card key={index} doctor={doctor} onBookAppointment={setSelectedDoctor} />
          ))}
        </div>
      </div>
      <div className="bg-[#A5DFE3] dark:bg-black dark:border-l dark:border-white w-1/3 h-full px-4 py-6 text-white">
        <div className="w-full h-120 bg-[#7ca7aa] dark:bg-gray-900 flex flex-col px-6 py-4 gap-4 items-center rounded-lg overflow-auto">
          <div className="relative w-full">
            <input className="w-full bg-white dark:bg-[#000000] dark:border dark:border-white dark:text-white rounded-lg text-sm py-2 text-slate-400 px-12 outline-none" type="text" placeholder="Search for specialist.." />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
          </div>
          <small>Find doctors by speciality</small>
          <ul className="flex flex-col gap-4 text-sm">
          <li className="hover:drop-shadow-lg hover:outline cursor-pointer dark:bg-[#286D7C] bg-[#3E97B0] rounded-lg px-4 py-2" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>General & Primary Care</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Heart & Circulatory System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Brain & Nervous System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Digestive System & Liver</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Kidney & Urinary System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Lungs & Respiratory System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Bones, Muscles & Joints</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Diabetes & Hormonal Disorders</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Skin, Hair & Nails</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Infections & Immune System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Eyes & Vision</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Mental Health & Behavior</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Women's Health & Pregnancy</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(72, 105, 105, 0.57)", }}>Children’s Health</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DoctorGrid;
