import React, { useState } from "react";
import Modal from "react-modal";
import { CheckCircle, XCircle, MapPin, ArrowLeft, Star,  Send } from "lucide-react";

const DoctorDetails = ({ selectedDoctor, setSelectedDoctor }) => {
    
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({ date: "", time: "", location: "" });
  const [availability, setAvailability] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [buttonText, setButtonText] = useState("Check doctor availability!");

  const handleCheckAvailability = () => {
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.location) {
      setValidationMessage("Please fill out all fields.");
      return;
    }
    setValidationMessage("");
    const isAvailable = Math.random() < 0.5;
    setAvailability(isAvailable);
    setButtonText(isAvailable ? "Available!" : "Sorry, not available.");
  };

  // const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  if (!selectedDoctor) return null;

  if (selectedDoctor) {
  return (
    <section className="w-full h-full bg-[#81B4B2] dark:bg-[#526768] p-4">
        <div className="flex h-[calc(100vh-110px)] bg-[#f9f9f9] dark:bg-[#000000] relative rounded-lg">
          <div className="w-1/2 p-6 bg-white dark:bg-[#000000] shadow-lg rounded-lg flex flex-col">
            <div className="flex gap-8">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.fullName}
                className="w-32 h-32 rounded-lg dark:border-2 dark:border-[#286d7c] mb-2"
              />
              {/* Updating the check availability of doctor button to use dynamic text */}
              <button
                className="w-48 text-center bg-slate-400 hover:bg-black dark:hover:bg-[#286d7c] hover:text-white hover:cursor-pointer drop-shadow-lg text-black px-2 py-1 rounded-md opacity-30"
                onClick={() => {
                  setModalIsOpen(true); // Opening the modal
                }}
              >
                {buttonText}
              </button>

              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="w-full h-full dark:bg-[#000000]/70 Modal absolute">
                <div className="bg-white dark:bg-[#000000] p-6 rounded-lg w-96 mx-auto mt-38 border-1 border-black dark:border-white">
                  <h2 className="text-lg dark:text-white font-semibold mb-4">Check Availability</h2>
                  <input
                    type="date"
                    className="border dark:border-[#48a9c5] dark:text-white p-2 mb-2 w-full rounded-sm"
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
                    className="border dark:border-[#48a9c5] dark:text-white p-2 mb-2 w-full rounded-sm"
                    placeholder="Time"
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        time: e.target.value,
                      })
                    }
                  />
                  <select
                    className="border dark:border-[#48a9c5] dark:text-white p-2 mb-4 w-full rounded-sm"
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        location: e.target.value,
                      })
                    }
                  >
                    <option className="dark:bg-black" value="">Select Location</option>
                    <option className="dark:bg-black" value="cabin">Doctor's Cabin</option>
                    <option className="dark:bg-black" value="home">Home Visit</option>
                  </select>

                  {/* Displaying validation message if needed */}
                  {validationMessage && (
                    <div className="text-red-600 text-sm mb-2">
                      {validationMessage}
                    </div>
                  )}

                  <button
                    className="bg-[#2E93B1] dark:bg-[#286d7c] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] transition mr-4 cursor-pointer"
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
                    className="mt-4 bg-gray-300 dark:hover:bg-red-900 hover:bg-red-400 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Close
                  </button>
                </div>
              </Modal>
            </div>

            <h2 className="text-xl dark:text-white font-bold">Dr. {selectedDoctor.fullName}</h2>
            <div className="flex gap-4 items-center pt-2 text-sm">
              <p className="text-gray-500 dark:text-gray-400">{selectedDoctor.specialistType}</p>
              <div className="flex items-center ">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-400">{selectedDoctor.rating} Star</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                <span>{selectedDoctor.location}</span>
              </div>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-500 text-sm text-justify">
              {selectedDoctor.about}
            </p>
            <ul className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              {selectedDoctor.keyPoints.map((point, index) => (
                <li key={index} className="list-disc ml-4">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-6 bg-[#a5dfe3] dark:bg-[#000000] dark:border-l dark:border-white flex flex-col rounded-lg rounded-tl-none rounded-bl-none">
            
            {/* reviews showing up on the basis of selected doctor card */}
            {selectedDoctor && (
              <div>
                <h2 className="text-lg text-[#0C8667] dark:text-white font-semibold mb-4">{selectedDoctor.fullName}'s Reviews</h2>
                {reviews.filter(review => review.doctorId === selectedDoctor.id).length > 0 ? (
                  <div className="space-y-4 text-sm h-32 overflow-y-auto">
                    {reviews
                      .filter(review => review.doctorId === selectedDoctor.id) // Filter reviews for the selected doctor
                      .map(review => (
                        <div
                          key={review.id}
                          className="flex items-start gap-3 bg-white dark:bg-[#45494a]/30 p-3 rounded-md shadow-md"
                        >
                          <img
                            src={review.profilePic}
                            // alt={review.name}
                            className="w-10 h-10 rounded-full dark:text-white border-2 dark:border-white"
                          />
                          <div>
                            <p className="font-semibold dark:text-[#48a9c5]">
                              {review.name}{" "}
                              <span className="text-sm text-gray-500">• {review.daysAgo} days ago</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-400">{review.review}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No reviews available for this doctor.</p>
                )}
                <div className="mt-4">
                  <textarea
                    className="w-full h-24 p-2 border border-slate-900 dark:border-white dark:text-white rounded-md"
                    placeholder="Write a comment..."
                  />
                  <button className="flex items-center absolute right-6 gap-2 mt-2 bg-[#2E93B1] dark:bg-[#286d7c] text-white px-4 py-2 rounded-md hover:bg-[#257a8e] transition cursor-pointer">
                    <Send className="w-4 h-4" />
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* back button to go back to doctor cards grid */}
          <button
            className="absolute top-4 right-6 flex items-center gap-2 dark:bg-[#286d7c] bg-[#2E93B1] hover:bg-[#257a8e] transition hover:cursor-pointer  text-white px-4 py-2 rounded-md shadow-md transition"
            onClick={() => setSelectedDoctor(null)}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Pay button at the bottom */}
          <button
            className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 border-1 rounded-md ${availability
                ? "bg-[#2E93B1] dark:bg-[#286D7C] hover:bg-[#257a8e] transition hover:cursor-pointer text-white drop-shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed border-2 dark:border-2"
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
};

export default DoctorDetails;
