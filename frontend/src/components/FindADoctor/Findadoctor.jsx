import React, { useState } from "react";
import { Search, Star, MapPin, ArrowLeft, Send, CheckCircle, XCircle } from "lucide-react";
import doctorImage from "../../assets/ProfilePic1.png";
import Modal from "react-modal";

// Card component code. 
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
    <button className="bg-[#2E93B1] dark:bg-[#286D7C] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] dark:hover:bg-[#2E93B1] transition hover:cursor-pointer" onClick={() => onBookAppointment(doctor)}>
      Book an Appointment
    </button>
  </div>
);

// Find a doctor page code.
const Findadoctor = () => {
  // state to manage selcted doctor so as to see the details while clicking on book an appointment
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Changed to false for testing

  // dummy data of doctor's reviews
  const reviews = [
    {
      id: 1,
      doctorId: 1, // Associated with Dr. Amit Mishra
      name: "John Doe",
      profilePic: "https://via.placeholder.com/40",
      daysAgo: 2,
      review: "Dr. Amit was very kind and helped me recover quickly. Highly recommended!",
    },
    {
      id: 2,
      doctorId: 1, // Associated with Dr. Amit Mishra
      name: "Jane Smith",
      profilePic: "https://via.placeholder.com/40",
      daysAgo: 5,
      review: "Great experience! The doctor explained everything very well.",
    },
    {
      id: 3,
      doctorId: 2, // Associated with Dr. Emily Davis
      name: "Alice Brown",
      profilePic: "https://via.placeholder.com/40",
      daysAgo: 1,
      review: "Dr. Emily was wonderful and very patient.",
    },
  ];

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
  ];

  // states to manage the open and close of modal and other things so as to check availability of doctor on the basis of date, time and location.
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({ date: "", time: "", location: "" });
  const [availability, setAvailability] = useState(null);
  const [buttonText, setButtonText] = useState("Check doctor availability!");
  const [validationMessage, setValidationMessage] = useState("");

  // function that will be called as soon as we click check doctor availability button
  const handleCheckAvailability = () => {
    // Validation of fields
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.location) {
      setValidationMessage("Please fill out all the fields: Date, Time, and Location.");
      return; // Exit if fields are incomplete
    }

    // Clear validation message once fields are valid
    setValidationMessage("");

    // Simulate availability check (just for testing)
    const isAvailable = Math.random() < 0.5; // 50% chance of being available
    setAvailability(isAvailable);
    setButtonText(isAvailable ? "Available!" : "Sorry, not available.");
  };

  // const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  //if doctor is not selected grid of doctors will show up otherwise details of selected doctor will show up
  if (selectedDoctor) {
    return (
      <section className="w-full h-full bg-[#81B4B2] p-4">
        <div className="flex h-[calc(100vh-110px)] bg-[#f9f9f9] relative rounded-lg">
          <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col">
            <div className="flex gap-8">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.fullName}
                className="w-32 h-32 rounded-lg mb-2"
              />
              {/* Updating the check availability of doctor button to use dynamic text */}
              <button
                className="w-48 text-center bg-slate-400 hover:bg-black hover:text-white hover:cursor-pointer drop-shadow-lg text-black px-2 py-1 rounded-md opacity-30"
                onClick={() => {
                  setModalIsOpen(true); // Opening the modal
                }}
              >
                {buttonText}
              </button>

              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
                <div className="bg-white p-6 rounded-lg w-96 mx-auto mt-38 border-1 border-black">
                  <h2 className="text-lg font-semibold mb-4">Check Availability</h2>
                  <input
                    type="date"
                    className="border p-2 mb-2 w-full rounded-sm"
                    placeholder="Date"
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        date: e.target.value,
                      })
                    }
                  />
                  <input
                    type="time"
                    className="border p-2 mb-2 w-full rounded-sm"
                    placeholder="Time"
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        time: e.target.value,
                      })
                    }
                  />
                  <select
                    className="border p-2 mb-4 w-full rounded-sm"
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        location: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Location</option>
                    <option value="cabin">Doctor's Cabin</option>
                    <option value="home">Home Visit</option>
                  </select>

                  {/* Displaying validation message if needed */}
                  {validationMessage && (
                    <div className="text-red-600 text-sm mb-2">
                      {validationMessage}
                    </div>
                  )}

                  <button
                    className="bg-[#2E93B1] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] transition mr-4 cursor-pointer"
                    onClick={handleCheckAvailability}
                  >
                    Check
                  </button>
                  {availability !== null && (
                    <div className="mt-4">
                      {availability ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="mr-2" />
                          Available!
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircle className="mr-2" />
                          Sorry, not available.
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    className="mt-4 bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Close
                  </button>
                </div>
              </Modal>
            </div>

            {/* code for comment section on the right half side */}
            <h2 className="text-xl font-bold">Dr. {selectedDoctor.fullName}</h2>
            <div className="flex gap-4 items-center pt-2 text-sm">
              <p className="text-gray-500">{selectedDoctor.specialistType}</p>
              <div className="flex items-center ">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-gray-600">{selectedDoctor.rating} Star</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                <span>{selectedDoctor.location}</span>
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-sm text-justify">
              {selectedDoctor.about}
            </p>
            <ul className="mt-4 text-gray-600 text-sm">
              {selectedDoctor.keyPoints.map((point, index) => (
                <li key={index} className="list-disc ml-4">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-6 bg-[#a5dfe3] flex flex-col rounded-lg rounded-tl-none rounded-bl-none">
            
            {/* reviews showing up on the basis of selected doctor card */}
            {selectedDoctor && (
              <div>
                <h2 className="text-lg text-[#0C8667] font-semibold mb-4">{selectedDoctor.fullName}'s Reviews</h2>
                {reviews.filter(review => review.doctorId === selectedDoctor.id).length > 0 ? (
                  <div className="space-y-4 text-sm h-32 overflow-y-auto">
                    {reviews
                      .filter(review => review.doctorId === selectedDoctor.id) // Filter reviews for the selected doctor
                      .map(review => (
                        <div
                          key={review.id}
                          className="flex items-start gap-3 bg-white p-3 rounded-md shadow-md"
                        >
                          <img
                            src={review.profilePic}
                            alt={review.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">
                              {review.name}{" "}
                              <span className="text-sm text-gray-500">• {review.daysAgo} days ago</span>
                            </p>
                            <p className="text-gray-700">{review.review}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews available for this doctor.</p>
                )}
                <div className="mt-4">
                  <textarea
                    className="w-full h-24 p-2 border border-slate-900 rounded-md"
                    placeholder="Write a comment..."
                  />
                  <button className="flex items-center absolute right-6 gap-2 mt-2 bg-[#2E93B1] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] transition">
                    <Send className="w-4 h-4" />
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* back button to go back to doctor cards grid */}
          <button
            className="absolute top-4 right-6 flex items-center gap-2 bg-[#2E93B1] hover:bg-[#0C8667] hover:cursor-pointer  text-white px-4 py-2 rounded-md shadow-md transition"
            onClick={() => setSelectedDoctor(null)}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Pay button at the bottom */}
          <button
            className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 border-1 rounded-md ${availability
                ? "bg-[#2E93B1] hover:bg-[#0C8667] hover:cursor-pointer text-white drop-shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            disabled={!availability} // Disable if doctor isn't available
            onClick={() => {
              // Payment logic here
              console.log("Proceeding to payment");
            }}
          >
            Finalize Appointment and Pay
          </button>
        </div>
      </section>
    );
  }
 
  return (
    <section className="flex">
      <div className="w-full h-132 overflow-y-auto py-3 px-6 dark:bg-[#000000]/88 bg-[#81B4B2]">
        <div className="grid grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <Card key={index} doctor={doctor} onBookAppointment={setSelectedDoctor} />
          ))}
        </div>
      </div>
      <div className="bg-[#A5DFE3] dark:bg-[#286D7C] w-1/3 h-full px-4 py-6 text-white">
        <div className="w-full h-120 bg-[#7ca7aa] dark:bg-[#000000]/20 flex flex-col px-6 py-4 gap-4 items-center rounded-lg overflow-auto">
          <div className="relative w-full">
            <input className="w-full bg-white dark:bg-[#000000] dark:text-white rounded-lg text-sm py-2 text-slate-400 px-12 outline-none" type="text" placeholder="Search for a specialist" />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
          </div>
          <small>Find doctors by speciality</small>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer dark:bg-[#286D7C] bg-[#3E97B0] rounded-lg px-4 py-2" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>General & Primary Care</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Heart & Circulatory System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Brain & Nervous System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Digestive System & Liver</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Kidney & Urinary System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Lungs & Respiratory System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Bones, Muscles & Joints</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Diabetes & Hormonal Disorders</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Skin, Hair & Nails</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Infections & Immune System</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Eyes & Vision</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Mental Health & Behavior</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Women's Health & Pregnancy</li>
            <li className="hover:drop-shadow-lg hover:outline cursor-pointer bg-[#3E97B0] rounded-lg px-4 py-2 dark:bg-[#286D7C]" style={{ boxShadow: "4px 4px 3px rgba(10, 11, 11, 0.57)", }}>Children’s Health</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Findadoctor;
