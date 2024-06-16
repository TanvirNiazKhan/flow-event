// NotificationCard.js
import React from "react";

const NotificationCard = ({ date }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-48">
            <div className="flex flex-row">
                <div className="w-1/3 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="currentColor"
                        class="bi bi-calendar-check-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                </div>
                <div className="w-2/3">
                    <div className="text-base font-bold">Day</div>
                    <div className="text-lg text-purple-700">{date}</div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
