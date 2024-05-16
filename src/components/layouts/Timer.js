import React from "react";

const Timer = () => {
    return (
        <div className=" w-48">
            <div className="flex">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        0
                    </div>
                    <p text-xs text-center w-12>
                        Days
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        0
                    </div>
                    <p text-xs text-center w-12>
                        Hrs
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        0
                    </div>
                    <p text-xs text-center w-12>
                        Mins
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        0
                    </div>
                    <p text-xs text-center w-12>
                        Secs
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Timer;
