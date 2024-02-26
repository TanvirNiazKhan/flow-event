import React, { useEffect, useReducer, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useStateValue } from "../../contexts/StateProvider";

import userContext, { initialState } from "../../contexts/reducer";
import { Avatar } from "@mui/material";
function Nav() {
  const [{ user }, dispatch] = useStateValue();
  console.log("from nav: ", user);
  const [clicked, setClicked] = useState(false);
  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "REMOVE_USER" });
        setClicked(!clicked);
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <header className="w-full items-center z-10 sticky top-0 bg-white">
      <div className="flex items-center justify-evenly  justify-center shadow-lg">
        <div>
          <NavLink to="/">
            <img
              className="h-20 w-20 "
              src="https://media.licdn.com/dms/image/C4E0BAQFa4a4sDSQ2Tw/company-logo_200_200/0/1630621716683/flow_events_agency_logo?e=2147483647&v=beta&t=Jy5ZfBnCZL5SCCkQsGQNBPvTnZM6UbUs3NnHHBUq1Ww"
            ></img>
          </NavLink>
        </div>
        <div className="flex justify-between w-4/12">
          {" "}
          {/* Added flex className here */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-lg text-purple-500 "
                : "font-bold text-lg"
            }
          >
            <p className="hover:underline underline-offset-8">Home</p>
          </NavLink>
          <NavLink
            to="/event"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-lg text-purple-500 "
                : "font-bold text-lg"
            }
          >
            <p className="font-bold text-lg hover:underline underline-offset-8">
              Events
            </p>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-lg text-purple-500 "
                : "font-bold text-lg"
            }
          >
            <p className="font-bold text-lg hover:underline underline-offset-8">
              Contacts
            </p>
          </NavLink>
          <NavLink
            to="/career"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-lg text-purple-500 "
                : "font-bold text-lg"
            }
          >
            <p className="font-bold text-lg hover:underline underline-offset-8">
              Career
            </p>
          </NavLink>
          <NavLink to="/hirePhotographer">
            <button className=" inline-flex items-center justify-center p-0.5   overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="text-base font-bold px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Hire Photographers
              </span>
            </button>
          </NavLink>
        </div>
        {user ? (
          <div style={{ position: "relative" }}>
            <a className="hover:cursor-pointer">
              <Avatar onClick={() => setClicked(!clicked)}>
                {user.user_name[0]}
              </Avatar>
            </a>

            {clicked && (
              <div className="items-center  absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-md">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <NavLink
                      to="/profile"
                      // className="block px-8 py-2 border border-b-2 hover:bg-gray-400 text-start font-bold"
                      className="block px-4 py-2 text-start font-bold text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={logout}
                      className="block px-4 py-2 text-start text-base font-bold  hover:bg-gray-100 text-red-600 dark:hover:bg-gray-600  dark:hover:text-white"
                    >
                      Log out
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="justify-evenly">
            <button>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? " text-purple-500" : " text-lg text-gray-700"
                }
              >
                <p className="font-bold text-lg ">Log In</p>
              </NavLink>
            </button>

            <NavLink to="signUp">
              <button
                type="button"
                className="ml-4  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign Up
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Nav;
