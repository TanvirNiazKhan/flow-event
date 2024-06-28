import React, { useEffect, useState } from "react";
import Carousel from "../components/layouts/Carousel";
import Card from "../components/layouts/Card";
import { collection, getDocs } from "firebase/firestore";
import { useStateValue } from "../contexts/StateProvider";
import { NavLink } from "react-router-dom";
import { db } from "../Firebase/firebase";

const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://cdn.pixabay.com/photo/2022/01/10/04/37/event-6927353_1280.jpg",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [events, setEvents] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    // Function to fetch events data from Firestore
    const fetchEvents = async () => {
      const colRef = collection(db, "events");
      try {
        const snapshot = await getDocs(colRef);
        const eventsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Filter events based on status
        const filteredEvents = eventsData.filter(event => event?.event_status === "accepted");

        // Sort events based on the number of registered persons
        const sortedEvents = filteredEvents.sort((a, b) => b?.registered_persons?.length - a?.registered_persons?.length);

        // Limit to 8 events
        const limitedEvents = sortedEvents.slice(0, 8);

        setEvents(limitedEvents);
        console.log(limitedEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
        return [];
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full h-full flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <div className="w-full flex items-center">
          <Carousel images={images} />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center py-10 md:py-16">
        <div className="md:text-left md:w-1/2 space-y-2 md:space-y-5">
          <h1 className="text-2xl md:text-5xl font-bold mt-4 md:mt-0">
            The people platform Where interests become friendships
          </h1>
          <p className="font-medium">Connect with like-minded individuals and transform shared interests into lasting friendships. Discover, engage, and grow together.</p>
          <NavLink to="/signUp" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Join Now
            </span>
          </NavLink>
        </div>

        <div className="md:w-1/2">
          <img
            src="https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=828"
            alt="event icon"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between m-auto mt-4 mb-4">
        <p className="text-xl md:text-4xl font-bold underline underline-offset-1 text-violet-700">
          Trending Events
        </p>
        <NavLink to="/event">
          <p className="md:text-xl font-bold text-blue-600">See all events</p>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id}>
            <Card card={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
