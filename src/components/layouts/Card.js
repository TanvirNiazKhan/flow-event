import React from "react";
import { NavLink } from "react-router-dom";

// Function to format Firestore timestamp to a readable date string
const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
  return "";
};

function Card({ card }) {
  return (
    <div className="max-w-sm mx-auto min-h-[450px]">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
        <div className="h-48 overflow-hidden rounded-t-lg">
          <img
            className="object-cover w-full h-full"
            src={card.event_img}
            alt={card.title}
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-1 text-start">
            <span className="text-lg font-bold text-purple-500">Date:</span>  {formatDate(card.event_date)}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-1 text-start">
            <span className="text-lg font-bold text-purple-500">Location:</span> {card.event_location}
          </p>
          <div className="mt-auto">
          <NavLink to={`/event/${card.id} `}>
          <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            </NavLink>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
