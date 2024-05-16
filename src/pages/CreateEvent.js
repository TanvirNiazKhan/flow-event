import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFirestore } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import {db} from "../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [eventType, setEventType] = useState("free");
  const [amount, setAmount] = useState("");
  const [eventName, setEventName] = useState("");
  const [event_img, setEvent_img] = useState("");
  const [short_description, setShort_description] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Successfully submitted event")
    // Prepare the event data
    const eventData = {
      name: eventName,
      amount: eventType === "paid" ? amount : "",
      contact: contactNumber,
      created_at: new Date(),
      deadline: deadline,
      details: eventDetails,
      event_date: startDate,
      event_img: event_img, // Placeholder for event image URL
      event_location: eventLocation,
      hosted_by: organizerName,
      short_description: short_description,
    };

    try {
      // Add the event data to the "events" collection in Firestore
      const docRef = await addDoc(collection(db, "events"), eventData);
      console.log("Event added successfully with ID: ", docRef.id);

      // Reset form fields after successful submission
      setStartDate(new Date());
      setEventType("free");
      setAmount("");
      setEventName("");
      setEvent_img("");
      setEventDetails("");
      setEventLocation("");
      setOrganizerName("");
      setContactNumber("");
      setDeadline("");
      setShort_description("")
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

// Function to reset form fields (assuming you have state variables for each field)
function resetFormFields() {
  setStartDate(null);
  setEventType("");
  setAmount("");
  setEventName("");
  setEventDetails("");
  setEventLocation("");
  setOrganizerName("");
  setContactNumber("");
  setDeadline("");
  setShort_description("");
  setEvent_img("");
  }


  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="text-lg text-purple-500 font-bold">
                    Event Details
                  </p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 text-left">
                      <label htmlFor="full_name" className="font-bold">
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5 text-left">
                      <label
                        htmlFor="event_details"
                        className="font-bold text-md"
                        required="true"
                      >
                        Event Details(*)
                      </label>
                      <input
                        type="text"
                        name="event_details"
                        id="event_details"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 py-12"
                        value={eventDetails}
                        onChange={(e) => setEventDetails(e.target.value)}
                        placeholder="Give Event Details here"
                      />
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="event_location" className="font-bold">
                         Short Description
                      </label>
                      <input
                        type="text"
                        name="short_description"
                        id="short_description"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={short_description}
                        onChange={(e) => setShort_description(e.target.value)}
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-6 text-left">
                      <label htmlFor="event_location" className="font-bold">
                        Location in Details
                      </label>
                      <input
                        type="text"
                        name="event_location"
                        id="event_location"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="banner_link" className="font-bold">
                        Banner Link
                      </label>
                      <input
                        type="text"
                        name="banner_link"
                        id="banner_link"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={event_img}
                        onChange={(e)=>setEvent_img(e.target.value)}
                        placeholder="Please give the url"
                      />
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="organizer_name" className="font-bold">
                        Organizer Name
                      </label>
                      <input
                        type="text"
                        name="organizer_name"
                        id="organizer_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        placeholder="Please give the url"
                      />
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="contact_number" className="font-bold">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        name="contact_number"
                        id="contact_number"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Please give the url"
                      />
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="event_date" className="mr-4 font-bold">
                        Event Date
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="h-8   border mt-1 rounded px-2 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="event_deadline" className="mr-4 font-bold">
                        Event Deadline
                      </label>
                      <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="h-8 border mt-1 rounded px-2 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-5 text-left">
                      <label htmlFor="event_type" className="mr-4 font-bold">
                        Event Type
                      </label>
                      <select
                        id="event_type"
                        name="event_type"
                        value={eventType}
                        onChange={handleEventTypeChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      >
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>

                    {eventType === "paid" && (
                      <div className="md:col-span-5 text-left">
                        <label htmlFor="amount" className="mr-4 font-bold">
                          Amount
                        </label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter amount"
                        />
                      </div>
                    )}

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://www.buymeacoffee.com/dgauderman"
            target="_blank"
            className="md:absolute bottom-0 right-0 p-4 float-right"
          >
            <img
              src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
              alt="Buy Me A Coffee"
              className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
