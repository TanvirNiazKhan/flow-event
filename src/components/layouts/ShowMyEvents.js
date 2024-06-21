import { useStateValue } from "../../contexts/StateProvider";
import React, { useEffect, useState } from 'react';
import { arrayUnion, doc, updateDoc,getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { collection, getDocs, where, query } from 'firebase/firestore';

const ShowMyEvents = () => {
    const [{ user }] = useStateValue();
    const [myEvents, setMyEvents] = useState([]);
  
    useEffect(() => {
      const fetchMyEvents = async () => {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('event_email', '==', user.user_email));
  
        try {
          const querySnapshot = await getDocs(q);
          const eventsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMyEvents(eventsData);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      if (user.user_email) {
        fetchMyEvents();
      }
    }, [user.user_email]);
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-4xl font-semibold mb-8 text-center">My Events</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myEvents.length === 0 && <p className="text-gray-600">No events found.</p>}
          {myEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img src={event.event_img} alt={event.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex-grow">
                <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-2">{event.short_description}</p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span> {event.event_location}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Hosted by:</span> {event.hosted_by}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Date:</span>{' '}
                  {/* {new Date(event.event_date?.toDate()).toLocaleString()} */}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Status:</span> {event.event_status}
                </p>
                <p className="text-gray-600 mb-4">{event.details}</p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Contact:</span> {event.contact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default ShowMyEvents;