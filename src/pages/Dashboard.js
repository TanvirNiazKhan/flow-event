import React, { useState, useEffect } from "react";
import { useStateValue } from "../contexts/StateProvider";
import { db } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Home from "./Home";
import Profile from "../components/layouts/Profile";
import ShowFavoriteEvent from "../components/layouts/ShowFavoriteEvent";
import ShowMyEvents from "../components/layouts/ShowMyEvents";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = useState(1);
  const [{ user }] = useStateValue();
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        // Get the user document reference
        const userDocRef = doc(db, "users", user.user_id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          // Get the user data
          const userData = userDocSnapshot.data();
          // Get the favorite events array from user data
          const favoriteEventIds = userData.favorites || [];

          if (favoriteEventIds.length > 0) {
            // Fetch details of favorite events from the "events" collection
            const favoriteEventsData = await Promise.all(
              favoriteEventIds.map(async (eventId) => {
                const eventDocRef = doc(db, "events", eventId);
                const eventDocSnapshot = await getDoc(eventDocRef);
                if (eventDocSnapshot.exists()) {
                  return { id: eventId, ...eventDocSnapshot.data() };
                } else {
                  console.error(`Event with ID ${eventId} not found.`);
                  return null;
                }
              })
            );

            // Filter out null values (in case an event wasn't found)
            const filteredFavoriteEvents = favoriteEventsData.filter(
              (event) => event !== null
            );

            setFavoriteEvents(filteredFavoriteEvents);
          }
        }
      } catch (error) {
        console.error("Error fetching favorite events:", error);
      }
    };

    if (user && user.user_id) {
      fetchFavoriteEvents();
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div className="flex flex-wrap w-full h-full mb-96">
          <div className="m-auto w-9/12 ">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Profile
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Favorite Events
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  My Events
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-9/12">
              <div className="px-4 py-5 flex-auto m-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <Profile user={user} />
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <div>
                      {favoriteEvents.length > 0 ? (
                        favoriteEvents.map((event) => (
                          <ShowFavoriteEvent key={event.id} event={event} user={user} />
                        ))
                      ) : (
                        <p>No favorite events found.</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <ShowMyEvents />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default function TabsRender() {
  return <Tabs color="purple" />;
}
