import React from "react";
import { Search } from "lucide-react";


const Findadoctor = () => {
    return (
        <section className="flex">
            <div className="bg-[#81B4B2] w-full h-full">
                grid 1
                grid2
            </div>
            <div className="bg-[#A5DFE3] w-1/3 h-full px-4 py-6 text-white">
                <div className="w-full h-100 bg-[#7ca7aa] flex flex-col px-6 py-4 gap-4 items-center rounded-lg overflow-auto">
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
