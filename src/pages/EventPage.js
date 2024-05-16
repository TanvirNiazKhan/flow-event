import React from "react";
// import image from "./image.png";
import NotificationCard from "../components/layouts/NotificationCard";
import Timer from "../components/layouts/Timer";
import { image } from "../resources/image.png"
import Ticket from "../components/layouts/Ticket";
export const EventPage = () => {
    return (
        <div className="bg-gray-100">
            <img src="https://secure.meetupstatic.com/photos/event/e/5/2/a/600_493978666.webp?w=384" alt="Your Image" className="w-full h-60" />
            <div className="container mx-auto p-4">
                <div className="flex flex-row">
                    <div className="w-2/3 p-4">
                        <h1 className="text-3xl">Hatirjheel Summer 7.5K Run 2024</h1>
                        <p className="text-sm">at Hatirjheel,Dhaka</p>
                        <p className="text-sm">Date & Time</p>
                        <NotificationCard />
                        <p className="text-red-600	font-bold">registration ended</p>
                        <Timer />

                        <div className="py-4">
                            <p className="text-lg font-bold">ABOUT THIS EVENT</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Corporis, excepturi. Harum ea suscipit rerum exercitationem vel
                                qui ab. Quis, vitae ad corporis iure harum molestias laudantium
                                nobis eum animi exercitationem!
                            </p>
                            <button className="text-blue-800 py-3">Read more...</button>
                        </div>

                        <div className="bg-white flex items-center">
                            <div className="w-1/4 p-2 ">image</div>
                            <div className="w-2/4 p-2 ">
                                <p className="text-lg">Name of the organuzer </p>
                                <p className="text-xs">num of followers</p>
                            </div>
                            <div className="w-1/4 p-2">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Follow
                                </button>
                            </div>
                        </div>
                        <div className="py-6">
                            <p className="text-sm font-bold"> Find Event</p>
                            <button class="bg-slate-200 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Button
                            </button>
                            <button class="bg-slate-200	 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Button
                            </button>
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
                                    class="bi bi-eye-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-center ">
                                Only few tickets left
                            </h1>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg border-l-4 border-orange-500 p-4">
                            <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="28"
                                    fill="currentColor"
                                    class="bi bi-ticket-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3z" />
                                </svg>
                                <h2 class="text-xl font-semibold text-gray-800 pl-1">
                                    Event Ticket
                                </h2>
                            </div>
                            <Ticket />
                        </div>

                        <div class="bg-white rounded-lg shadow-lg border-l-4 border-orange-500 p-4 my-6">
                            <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="26"
                                    fill="currentColor"
                                    class="bi bi-geo-alt-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <h2 class="text-xl font-semibold text-gray-800 pl-1">
                                    EVENT LOCATION
                                </h2>
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1234567890123!2d-73.985428!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzEwLjAiTiA3M8KwMjUnMTkuMCJX!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-bold p-4">Welcome to My Website</h1>
            <p className="mt-2 text-lg">ADD card Component</p>
        </div>
    );
};
