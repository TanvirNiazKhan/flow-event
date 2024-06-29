import React, { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { db } from "../../Firebase/firebase.js";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Ticket = ({ event }) => {
  const [{ user }] = useStateValue();
  const [isRegistered, setIsRegistered] = useState(false);
  const { name, hosted_by, event_location, event_date, additional_info, eventId, contact, amount } = event;
  const navigate = useNavigate();

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

  const seat_available = event.total_seats - (event.registered_persons?.length || 0);

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
      toast.error('Invalid date format');
      return;
    }

    const eventDateString = new_event_Date.toLocaleDateString();

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

    try {
      await emailjs.send(
        'service_m9kreu8',
        'template_uldlsjn',
        templateParams,
        'XeXXZY7odrzRUZRuq'
      );
      console.log('Email sent successfully');

      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        registered_persons: arrayUnion({
          user_email: user?.user_email,
          user_name: user?.user_name,
        })
      });
      setIsRegistered(true);
      // toast.success('Registration Successful!');

      if (amount > 0) {
        const postData = {
          user_email: user?.user_email,
          user_name: user?.user_name,
          event_contact: contact,
          event_fee: Number(amount),
          event_id: eventId,
          event_name: name,
        };

        try {
          const response = await fetch('http://localhost:8080/details', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });

          if (!response.ok) {
            throw new Error('Error sending data to server.');
          }

          const responseData = await response.json();
          console.log('Success:', responseData);

          window.location.href = responseData.redirectUrl;
        } catch (error) {
          console.error('Error:', error);
          toast.error('Error sending data to server.');
        }
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      toast.error('Error registering event. Please try again.');
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-blue-500">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">BDT {amount}</div>
        <button
          onClick={handleRegisterEvent}
          className={`font-bold py-2 px-4 rounded text-white border-2 transition-all duration-300 ease-in-out ${isRegistered || seat_available <= 0 ? 'bg-gray-400 border-gray-400 cursor-not-allowed' : 'bg-purple-600 border-purple-600 hover:bg-transparent hover:text-black'}`}
          disabled={isRegistered || seat_available <= 0}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default Ticket;
