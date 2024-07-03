import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import NotificationCard from "../components/layouts/NotificationCard";
import Timer from "../components/layouts/Timer";
import Ticket from "../components/layouts/Ticket";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const EventPage = () => {
    const { eventPage } = useParams(); // Extract eventPage from useParams
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventRef = doc(db, "events", eventPage); // Use eventPage directly as the eventId
                const eventDoc = await getDoc(eventRef);
                if (eventDoc.exists()) {
                    setEvent({ ...eventDoc.data(), eventId: eventPage }); // Add eventId to the event data
                    console.log(eventDoc.data());
                } else {
                    console.error("No such event!");
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventPage]);

    if (!event) {
        return <div>Loading...</div>;
    }

    let eventDate;
    if (event.event_date && event.event_date.seconds) {
        eventDate = new Date(event.event_date.seconds * 1000);
    } else {
        console.error("Invalid date format:", event.event_date);
        return <div>Invalid date format</div>;
    }

    if (!eventDate || isNaN(eventDate.getTime())) {
        console.error("Invalid date format:", event.event_date);
        return <div>Invalid date format</div>;
    }
    const deadlineDate = new Date(event.deadline.seconds * 1000);
    const currentDateInMs = Date.now();
    console.log(currentDateInMs, " ", deadlineDate);

    const currentDate = deadlineDate - currentDateInMs;
    const currentDateInDays = currentDate / (1000 * 60 * 60 * 24);
    console.log(currentDateInDays);
    console.log(event.total_seats)
    const seat_available = event.total_seats - event.registered_persons?.length;
    return (
        <div className="bg-gray-100 w-10/12 m-auto">
            <img src={event.event_img} alt="Your Image" className="w-full h-[500px]" />
            <div className="container mx-auto p-4">
                <div className="flex flex-row">
                    <div className="w-2/3 p-4">
                        <h1 className="text-3xl">{event.name}</h1>
                        <p className="text-sm">at {event.event_location}</p>
                        <p className="text-sm">{eventDate.toLocaleDateString()}</p>
                        <NotificationCard date={eventDate.toLocaleDateString()} />
                        <Timer  militodays={currentDateInDays}/>

                        <div className="py-4">
                            <p className="text-lg font-bold">ABOUT THIS EVENT</p>
                            <p>{event.details}</p>
                            <button className="text-blue-800 py-3">Read more...</button>
                        </div>

                        <div className="bg-white flex items-center">
                            <div className="w-1/4 p-2">image</div>
                            <div className="w-2/4 p-2">
                                <p className="text-lg">{event.hosted_by} </p>
                                <p className="text-xs">2,000 followers</p>
                            </div>
                            <div className="w-1/4 p-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 p-4 my-6">
                        <div className="flex justify-center">
                            <div className="pr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    className="bi bi-eye-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-center mb-4">
                                Only {seat_available} tickets left
                            </h1>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg border-l-4 border-orange-500 p-4">
                            <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="28"
                                    fill="currentColor"
                                    className="bi bi-ticket-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 pl-1">
                                    Event Ticket
                                </h2>
                            </div>
                            <Ticket event={event} />
                        </div>

                        <div className="bg-white rounded-lg shadow-lg border-l-4 border-orange-500 p-4 my-6">
                            <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="26"
                                    fill="currentColor"
                                    className="bi bi-geo-alt-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 pl-1">
                                    EVENT LOCATION
                                </h2>
                            </div>
                            <MapContainer center={[23.8103, 90.4125]} zoom={13} style={{ height: "450px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[23.8103, 90.4122]}>
                                    <Popup>
                                        Event Location: Dhaka
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
