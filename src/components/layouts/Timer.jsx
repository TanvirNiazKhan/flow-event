import React from "react";
import useTimer from "../../hooks/useTimer";

const Timer = () => {
    const {days,hours,minutes,seconds}=useTimer({timerDays: 2.5});
    return (
        <div className=" w-48 mt-12">
            <div className="flex">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        {days}
                    </div>
                    <p text-xs text-center w-12>
                        Days
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        {hours}
                    </div>
                    <p text-xs text-center w-12>
                        Hrs
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        {minutes}
                    </div>
                    <p text-xs text-center w-12>
                        Mins
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-indigo-100 text-indigo-700 p-4 mx-1 font-bold rounded-lg shadow-sm">
                        {seconds}
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
