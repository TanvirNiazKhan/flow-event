import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ShowEvent from "../components/layouts/ShowEvent";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";

function Event() {
  const [events, setEvents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [showResults, setShowResults] = useState(false);
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
        const acceptedEvents = eventsData.filter(
          (event) => event.event_status === "accepted"
        );
        return acceptedEvents;
      } catch (error) {
        console.error("Error fetching events: ", error);
        return [];
      }
    };

    // Check if events data is available in local storage
    const cachedEvents = localStorage.getItem("events");
    const cachedTimestamp = localStorage.getItem("eventsTimestamp");
    const currentTime = new Date().getTime();

    // Check if cached data is available and not older than 24 hours
    if (cachedEvents && cachedTimestamp && currentTime - cachedTimestamp < 86400000) {
      console.log("from chache");
      setEvents(JSON.parse(cachedEvents));
    } else {
      // Fetch data from Firestore and cache it
      fetchEvents().then((eventsData) => {
        setEvents(eventsData);
        localStorage.setItem("events", JSON.stringify(eventsData));
        localStorage.setItem("eventsTimestamp", currentTime.toString());
      });
    }
  }, []);

  const handleNameFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = events.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setWordEntered("");
      setShowResults(false);
    } else {
      setFilteredData(newFilter);
      setShowResults(true);
    }
  };

  const handleIdFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = events.filter((value) => {
      return value.id.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setWordEntered("");
      setShowResults(false);
    } else {
      setFilteredData(newFilter);
      setShowResults(true);
    }
  };

  const handleAreaFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = events.filter((value) => {
      return value.event_location.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setWordEntered("");
      setShowResults(false);
    } else {
      setFilteredData(newFilter);
      setShowResults(true);
    }
  };

  const handleDateFilter = (event) => {
    const searchDate = new Date(event.target.value).setHours(0, 0, 0, 0); // Convert to milliseconds and set time to start of day
    const nextDay = new Date(searchDate + 86400000); // Calculate the next day in milliseconds
    const newFilter = events.filter((value) => {
      const eventDate = new Date(value.event_date.seconds * 1000).setHours(0, 0, 0, 0); // Convert Firestore timestamp to milliseconds and set time to start of day
      return eventDate >= searchDate && eventDate < nextDay;
    });

    if (event.target.value === "") {
      setFilteredData([]);
      setWordEntered("");
      setShowResults(false);
    } else {
      setFilteredData(newFilter);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setFilteredData([]);
    setWordEntered("");
    setShowResults(false);
    document.getElementById("search").value = "";
    document.getElementById("id").value = "";
    document.getElementById("area").value = "";
    document.getElementById("date").value = "";
    document.getElementById("status").value = "All";
  };

  return (
    <div className="w-full flex">
      <div className="m-2 w-4/12 max-w-screen-md relative s top-2 z-9 ">
        <div className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <form className="">
              <div className="relative mb-10 w-full flex items-center justify-between rounded-md">
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by name of event"
                  onChange={handleNameFilter}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                <div className="flex flex-col">
                  <label
                    htmlFor="id"
                    className="text-base text-start font-medium text-stone-600"
                  >
                    Event ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    placeholder="1234"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={handleIdFilter}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="area"
                    className="text-base text-start font-medium text-stone-600"
                  >
                    Area
                  </label>
                  <input
                    type="text"
                    id="area"
                    placeholder="Search by Place"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={handleAreaFilter}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-stone-600 text-start"
                  >
                    Date of Event
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={handleDateFilter}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-stone-600 text-start"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>All</option>
                    <option>Free</option>
                    <option>Paid</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button
                  type="button"
                  className="ml-4 border-2 border-purple-600 text-black bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="ml-4 text-white px-8 py-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="">
            {user ? (
              <NavLink to="/event/createEvent">
                <button
                  type="button"
                  className="mt-6 text-white w-full bg-gradient-to-br from-green-600 to-green-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                >
                  Create Event
                </button>
              </NavLink>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <NavLink to=""></NavLink>
      {showResults && (
        <div>
          {filteredData.map((event) => (
            <ShowEvent event={event} key={event.id} />
          ))}
        </div>
      )}
      {!showResults && (
        <div>
          {events.map((event) => (
            <ShowEvent event={event} key={event.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Event;
