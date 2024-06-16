import React from "react";

const Ticket = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-blue-500">
            <div className="px-6 py-4">
                <div>
                    <p>7.5km | General</p>
                </div>
                <hr className="p-4 flex justify-center items-center" />
                <div className="font-bold text-xl mb-2">Tk 1450</div>

                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover: bg-purple-600">
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default Ticket;
