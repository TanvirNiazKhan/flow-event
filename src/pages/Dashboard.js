import React, { useState, useEffect } from "react";
import { useStateValue } from "../contexts/StateProvider";
import userContext, { initialState } from "../contexts/reducer";
import Home from "./Home";
import { db } from "../Firebase/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Profile from "../components/layouts/Profile";
import Event from "./Event";
import ShowEvent from "../components/layouts/ShowEvent";
import ShowFavoriteEvent from "../components/layouts/ShowFavoriteEvent";
const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [{ user }, dispatch] = useStateValue();
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
          const favoriteEventIds = userData.favorites;

          if (favoriteEventIds.length > 0) {
            // Fetch details of favorite events from the "events" collection
            const favoriteEventsData = await Promise.all(
              favoriteEventIds.map(async (eventId) => {
                const eventDocRef = doc(db, "events", eventId);
                const eventDocSnapshot = await getDoc(eventDocRef);
                if (eventDocSnapshot.exists()) {
                  return eventDocSnapshot.data();
                } else {
                  console.error(`Event with ID ${eventId} not found.`);
                  return null;
                }
              })
            );

            // Filter out null values (in case an event wasn't found)
            const filteredFavoriteEvents = favoriteEventsData.filter((event) => event !== null);

            setFavoriteEvents(filteredFavoriteEvents);
          }
        }
      } catch (error) {
        console.error("Error fetching favorite events:", error);
      }
    };

    if (user) {
      fetchFavoriteEvents();
    }
  }, [user]);

  console.log(user);
  return (
    <>
      {user ? (
        <div className="flex flex-wrap w-full h-full">
          <div className="m-auto w-9/12">
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
                      {/* <h2 className="text-2xl font-bold mb-4">Favorite Events</h2> */}
                      {favoriteEvents.length > 0 ? (
                        favoriteEvents.map((event) => <ShowFavoriteEvent key={event.id} event={event} />)
                      ) : (
                        <p>No favorite events found.</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
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
  return (
    <>
      <Tabs color="purple" />;
    </>
  );
}
