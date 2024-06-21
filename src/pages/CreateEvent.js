import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFirestore } from 'firebase/firestore';
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import { db } from "../Firebase/firebase";
import { doc, getDoc,addDoc,collection } from "firebase/firestore"
import { useStateValue } from "../contexts/StateProvider";
import * as Yup from "yup";
const validationSchema = Yup.object({
  eventName: Yup.string().required("Event Title is required"),
  eventDetails: Yup.string().required("Event Details are required"), // Corrected message
  short_description: Yup.string(),
  eventLocation: Yup.string(),
  event_img: Yup.string().url("Invalid URL format"),
  organizerName: Yup.string(),
  contactNumber: Yup.string().matches(/^[0-9]{11}$/, "Invalid phone number format"),
  startDate: Yup.date().required("Event Date is required"),
  deadline: Yup.date().required("Event Deadline is required"),
  eventType: Yup.string().required("Event Type is required"),
  amount: Yup.number().when("eventType", {
    is: (value) => value === "paid",
    then: (schema) => schema
      .required("Amount is required")
      .positive("Amount must be positive"),
    otherwise: (schema) => schema,
  }),
});


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
  const [{ user }] = useStateValue();
  console.log(user?.user_email)

  const formik = useFormik({
    initialValues: {
      eventName: "",
      eventDetails: "",
      short_description: "",
      eventLocation: "",
      event_img: "",
      organizerName: "",
      contactNumber: "",
      startDate: new Date(),
      deadline: new Date(),
      eventType: "free",
      amount: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Prepare the event data
      const eventData = {
        name: values.eventName,
        amount: values.eventType === "paid" ? values.amount : "",
        contact: values.contactNumber,
        created_at: new Date(),
        deadline: values.deadline,
        details: values.eventDetails,
        event_date: values.startDate,
        event_img: values.event_img,
        event_location: values.eventLocation,
        hosted_by: values.organizerName,
        short_description: values.short_description,
        event_status: "pending",
        event_email: user?.user_email,
      };

      try {
        // Add the event data to the "events" collection in Firestore
        const docRef = await addDoc(collection(db, "events"), eventData);
        console.log("Event added successfully with ID: ", docRef.id);
        toast.success("Event submitted successfully!");

        // Reset form fields after successful submission
        formik.resetForm();
      } catch (error) {
        console.error("Error adding event: ", error);
        toast.error("Failed to submit event. Please try again later.");
      }
    }
  });

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    formik.setFieldValue("eventType", e.target.value);
  };


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
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 text-left">
                      <label htmlFor="eventName" className="font-bold">
                        Event Title
                      </label>
                      <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.eventName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.eventName && formik.errors.eventName ? (
                        <div className="text-red-500 text-xs">{formik.errors.eventName}</div>
                      ) : null}
                    </div>

                    <div className="md:col-span-5 text-left">
                      <label
                        htmlFor="eventDetails"
                        className="font-bold text-md"
                        required="true"
                      >
                        Event Details(*)
                      </label>
                      <input
                        type="text"
                        id="eventDetails"
                        name="eventDetails"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 py-12"
                        value={formik.values.eventDetails}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Give Event Details here"
                      />
                      {formik.touched.eventDetails && formik.errors.eventDetails ? (
                        <div className="text-red-500 text-xs">{formik.errors.eventDetails}</div>
                      ) : null}
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="short_description" className="font-bold">
                        Short Description
                      </label>
                      <input
                        type="text"
                        id="short_description"
                        name="short_description"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.short_description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=""
                      />
                      {formik.touched.short_description && formik.errors.short_description ? (
                        <div className="text-red-500 text-xs">{formik.errors.short_description}</div>
                      ) : null}
                    </div>

                    <div className="md:col-span-6 text-left">
                      <label htmlFor="eventLocation" className="font-bold">
                        Location in Details
                      </label>
                      <input
                        type="text"
                        id="eventLocation"
                        name="eventLocation"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.eventLocation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=""
                      />
                      {formik.touched.eventLocation && formik.errors.eventLocation ? (
                        <div className="text-red-500 text-xs">{formik.errors.eventLocation}</div>
                      ) : null}
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="event_img" className="font-bold">
                        Banner Link
                      </label>
                      <input
                        type="text"
                        id="event_img"
                        name="event_img"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.event_img}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Please give the url"
                      />
                      {formik.touched.event_img && formik.errors.event_img ? (
                        <div className="text-red-500 text-xs">{formik.errors.event_img}</div>
                      ) : null}
                    </div>
                    <div className="md:col-span-6 text-left">
                      <label htmlFor="organizerName" className="font-bold">
                        Organizer Name
                      </label>
                      <input
                        type="text"
                        id="organizerName"
                        name="organizerName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.organizerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Please give the url"
                      />
                      {formik.touched.organizerName && formik.errors.organizerName ? (<div className="text-red-500 text-xs">{formik.errors.organizerName}</div>
                        ) : null}
                      </div>
                      <div className="md:col-span-6 text-left">
                        <label htmlFor="contactNumber" className="font-bold">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contactNumber"
                          name="contactNumber"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.contactNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Please give the contact number"
                        />
                        {formik.touched.contactNumber && formik.errors.contactNumber ? (
                          <div className="text-red-500 text-xs">{formik.errors.contactNumber}</div>
                        ) : null}
                      </div>
                      <div className="md:col-span-6 text-left">
                        <label htmlFor="startDate" className="mr-4 font-bold">
                          Event Date
                        </label>
                        <DatePicker
                          selected={formik.values.startDate}
                          onChange={(date) => formik.setFieldValue("startDate", date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="h-8 border mt-1 rounded px-2 w-full bg-gray-50"
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                          <div className="text-red-500 text-xs">{formik.errors.startDate}</div>
                        ) : null}
                      </div>
                      <div className="md:col-span-6 text-left">
                        <label htmlFor="deadline" className="mr-4 font-bold">
                          Event Deadline
                        </label>
                        <DatePicker
                          selected={formik.values.deadline}
                          onChange={(date) => formik.setFieldValue("deadline", date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="h-8 border mt-1 rounded px-2 w-full bg-gray-50"
                        />
                        {formik.touched.deadline && formik.errors.deadline ? (
                          <div className="text-red-500 text-xs">{formik.errors.deadline}</div>
                        ) : null}
                      </div>
                      <div className="md:col-span-5 text-left">
                        <label htmlFor="eventType" className="mr-4 font-bold">
                          Event Type
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formik.values.eventType}
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleEventTypeChange(e);
                          }}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                          <option value="free">Free</option>
                          <option value="paid">Paid</option>
                        </select>
                        {formik.touched.eventType && formik.errors.eventType ? (
                          <div className="text-red-500 text-xs">{formik.errors.eventType}</div>
                        ) : null}
                      </div>

                      {formik.values.eventType === "paid" && (
                        <div className="md:col-span-5 text-left">
                          <label htmlFor="amount" className="mr-4 font-bold">
                            Amount
                          </label>
                          <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Enter amount"
                          />
                          {formik.touched.amount && formik.errors.amount ? (
                            <div className="text-red-500 text-xs">{formik.errors.amount}</div>
                          ) : null}
                        </div>
                      )}

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://www.buymeacoffee.com/dgauderman"
            target="_blank"
            rel="noopener noreferrer"
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
