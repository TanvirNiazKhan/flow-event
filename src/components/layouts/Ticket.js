import React, { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { db } from "../../Firebase/firebase.js";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";

const Ticket = ({ event }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isRegistered, setIsRegistered] = useState(false);
  let { name, hosted_by, event_location, event_date, event_time, additional_info, eventId } = event;

  useEffect(() => {
    const checkRegistration = async () => {
      if (eventId && user?.user_email) {
        try {
          const eventDocRef = doc(db, "events", eventId);
          const eventDoc = await getDoc(eventDocRef);
          if (eventDoc.exists()) {
            const eventData = eventDoc.data();
            const registeredPersons = eventData.registered_persons || [];
            const userEmail = user.user_email;
            const alreadyRegistered = registeredPersons.some(person => person.user_email === userEmail);
            setIsRegistered(alreadyRegistered);
          }
        } catch (error) {
          console.error("Error fetching event data: ", error);
        }
      }
    };
    checkRegistration();
  }, [eventId, user]);

  const handleRegisterEvent = async () => {
    if (isRegistered) {
      toast.info('You are already registered for this event.');
      return;
    }

    const eventData = {
      name,
      hosted_by,
      event_location,
      user_email: user?.user_email,
      hosted_agency: "Flow Event Agency"
    };
    let new_event_Date;
    if (event_date && event_date.seconds) {
      new_event_Date = new Date(event.event_date.seconds * 1000);
    } else {
      console.error("Invalid date format:", event.event_date);
      return <div>Invalid date format</div>;
    }
    console.log(eventData);
    const eventDateString = new Date(new_event_Date).toLocaleDateString();

    // Send email
    const templateParams = {
      to_name: user?.displayName,
      from_name: "Flow Event Agency",
      to_email: user?.user_email,
      user_email: user?.user_email,
      event_name: name,
      event_date: eventDateString,
      event_location,
      additional_info: additional_info || "N/A",
    };

    emailjs.send(
      'service_m9kreu8',
      'template_uldlsjn',
      templateParams,
      'XeXXZY7odrzRUZRuq'
    )
      .then(async (response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Registration Successful!');

        // Add a new document of registered events.
        try {
          const eventDocRef = doc(db, "events", eventId); // Ensure `eventId` is passed correctly
          await updateDoc(eventDocRef, {
            registered_persons: arrayUnion({
              user_email: user?.user_email,
              user_name: user?.user_name,
            })
          });
          setIsRegistered(true);
        } catch (error) {
          console.error("Error adding document: ", error);
          toast.error('Error registering event. Please try again.');
        }
      }, (error) => {
        console.log('FAILED...', error);
        toast.error('Registration Failed. Please try again.');
      });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-blue-500">
      <div className="px-6 py-4">
        <div>
          {/* <p>7.5km | General</p> */}
        </div>
        <hr className="p-4 flex justify-center items-center" />
        <div className="font-bold text-xl mb-2"></div>

        <button
          onClick={handleRegisterEvent}
          className={`font-bold py-2 px-4 rounded text-white border-2 transition-all duration-300 ease-in-out ${isRegistered ? 'bg-gray-400 border-gray-400 cursor-not-allowed' : 'bg-purple-600 border-purple-600 hover:bg-transparent hover:text-black'}`}
          disabled={isRegistered}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default Ticket;
