import React from "react";
import Carousel from "../components/layouts/Carousel";
import Card from "../components/layouts/Card";

import Footers from "../components/layouts/Footers";
import { NavLink } from "react-router-dom";

const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://cdn.pixabay.com/photo/2022/01/10/04/37/event-6927353_1280.jpg",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const cards = [
    {
      title: "AI and its potential impact, a casual discussion over food",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/c/9/4/7/event_518871527.webp?w=384",
    },
    {
      title:
        "Meditation Group in Bay Ridge and conversation on different topics",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/6/4/b/0/600_514705776.webp?w=384",
    },
    {
      title:
        "Meditation Group in Bay Ridge and conversation on different topics",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/2/b/7/d/clean_474011133.webp",
    },
    {
      title: "AI and its potential impact, a casual discussion over food",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/c/9/4/7/event_518871527.webp?w=384",
    },
    {
      title: "AI and its potential impact, a casual discussion over food",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/c/9/4/7/event_518871527.webp?w=384",
    },
    {
      title: "AI and its potential impact, a casual discussion over food",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/c/9/4/7/event_518871527.webp?w=384",
    },
    {
      title: "AI and its potential impact, a casual discussion over food",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/c/9/4/7/event_518871527.webp?w=384",
    },
    {
      title: "AI and its potential impact, a casual discussion over foods",
      hosted: "Nayeem hasan",
      time: "8 february 2024",
      image:
        "https://secure.meetupstatic.com/photos/event/c/9/4/7/event_518871527.webp?w=384",
    },
    // Add more card objects as needed
  ];

  // Function to chunk the cards array into arrays of 4 elements each
  const chunkArray = (array, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArr.push(array.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  // Split the cards array into chunks of 4 elements each
  const chunkedCards = chunkArray(cards, 4);

  return (
    <div className="w-full h-full flex-col items-center justify-center mt-1">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-9/12 flex items-center">
          <Carousel images={images} />
        </div>
      </div>
      <div className="flex justify-between w-9/12 items-center  m-auto">
        <div>
          <p className="text-4xl font-bold ">
            The people platform Where interests <br></br> become friendships
          </p>
          <NavLink to="/signUp">
            <button className="relative inline-flex items-center justify-center p-0.5 m-3 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Join Now
              </span>
            </button>
          </NavLink>
        </div>
        <div>
          <img
            src="https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=828"
            alt="event icon"
          />
        </div>
      </div>
      <div className="w-9/12 flex items-center justify-between m-auto mt-4 mb-4">
        <p className="text-4xl font-bold underline underline-offset-1 text-violet-700">
          Trending Events
        </p>
        <NavLink to="/event">
          <p className="text-xl font-bold text-blue-600">See all events</p>
        </NavLink>
      </div>
      {/* Render each chunk of cards in a separate row */}
      {chunkedCards.map((chunk, index) => (
        <div key={index} className="w-9/12 flex m-auto justify-between mb-4">
          {chunk.map((card, cardIndex) => (
            <div key={cardIndex}>
              <Card card={card} />
            </div>
          ))}
        </div>
      ))}
      <div className="">
        <Footers />
      </div>
    </div>
  );
};

export default Home;
