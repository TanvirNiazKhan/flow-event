import React from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { db } from "../../Firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";

const Ticket = ({ event }) => {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);
  console.log("From Ticket", event);
  const { name, hosted_by, event_location } = event;

  const handleRegisterEvent = async () => {
    const eventData = {
      name,
      hosted_by,
      event_location,
      user_email: user?.user_email,
      hosted_agency: "Flow Event Agency"
    };
    console.log(eventData);

    //send email
    const templateParams = {
        user_email: user?.user_email,
        subject: "Event Registration Successful",
        message: "You have successfully registered for the upcoming event",
    };

    emailjs.send(
        'service_e04hrxh', // Replace with your EmailJS service ID
        'template_t19fhab', // Replace with your EmailJS template ID
        templateParams,
        'BP__gMaZH_QkHb8Zy' // Replace with your EmailJS user ID
    )
    .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Registration Successful!');
    }, (error) => {
        console.log('FAILED...', error);
    });



    // Add a new document of registered events.
    const docRef = await addDoc(collection(db, "registeredEvents"), eventData);
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-blue-500">
      <div className="px-6 py-4">
        <div>
          <p>7.5km | General</p>
        </div>
        <hr className="p-4 flex justify-center items-center" />
        <div className="font-bold text-xl mb-2">Tk 1450</div>

        <button
          onClick={handleRegisterEvent}
          className="font-bold py-2 px-4 rounded text-white bg-purple-600 border-2 border-purple-600 hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Ticket;
