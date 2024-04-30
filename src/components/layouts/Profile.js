import React from "react";
import ProfileDetails from "../layouts/ProfileDetails";

const Profile = ({user}) => {
  return (
    <div className="w-full mx-2 h-full text-start">
      <div className="w-full bg-white p-3 shadow-sm rounded-sm h-full">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="text-green-500">
            <svg
              className="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">About</span>
        </div>
        <div className="w-full text-gray-700">
          <div className="w-full grid md:grid-cols-2 text-lg m-auto">
            <ProfileDetails label="Name" value={user.user_name}/>
            <ProfileDetails label="Gender" value="Female"/>
            
            <ProfileDetails label="Email" value={user.user_email}/>
            <ProfileDetails label="Phone" value="+8801329324"/>
            <ProfileDetails label="Current Address" value="Tongi, Gazipur"/>
            <ProfileDetails label="Birth Date" value="08-09-1991"/>

          </div>
        </div>
        <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
          Show Full Information
        </button>
      </div>
    </div>
  );
};

export default Profile;
