import React, { useState, useEffect } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

function ShowFavoriteEvent({ event }) {
  const eventDate = new Date(event.event_date.toDate());
  const [{ user }] = useStateValue(); // Access user from context
  const [isFavorite, setIsFavorite] = useState(true);
  const [favoriteEvents, setFavoriteEvents] = useState([]); // State to hold favorite events

  useEffect(() => {
    // Update favorite events in state whenever isFavorite changes
    if (user && user.user_id && event.id) {
      setFavoriteEvents((prevEvents) => {
        // Remove the event from favoriteEvents if isFavorite is false
        if (!isFavorite) {
          return prevEvents.filter((favEvent) => favEvent.id !== event.id);
        }
        return prevEvents;
      });
    }
  }, [isFavorite, event.id, user]);

  const handleRemoveFromFavorites = async () => {
    if (user && user.user_id && event.id) {
      try {
        const userDocRef = doc(db, "users", user.user_id);
        if (isFavorite) {
          await updateDoc(userDocRef, {
            favorites: arrayRemove(event.id),
          });
          setIsFavorite(false);
          console.log("Event removed from favorites successfully!");
        } else {
          console.log("Event is not in favorites.");
        }
      } catch (error) {
        console.error("Error removing event from favorites:", error);
      }
    } else {
      console.log("User not authenticated or event ID is undefined.");
    }
  };

  const formattedDate = eventDate.toLocaleDateString();

  return (
    <>
      {isFavorite && ( // Render the component only if the event is in favorites
        <div className="w-11/12 m-4 border border-gray-300 rounded-lg shadow-md">
          <div className="max-w-sm w-10/12 lg:max-w-full lg:flex">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              <img
                className="object-center object-fill w-full h-full"
                src={event.event_img}
                alt=""
              />
            </div>
            <div className="lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2 text-start">
                  {event.name}
                </div>
                <p className="text-gray-700 text-base text-start">
                  {event.short_description}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="https://th.bing.com/th/id/OIP.YyIPGs_HGe7qNiklWMWYpgHaHa?rs=1&pid=ImgDetMain"
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-sm w-40">
                  <p className="text-gray-900 leading-none">{event.hosted_by}</p>
                  <p className="text-gray-600">{formattedDate}</p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={handleRemoveFromFavorites}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowFavoriteEvent;
