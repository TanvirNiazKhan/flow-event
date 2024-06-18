import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { signUpSchema } from "../schemas";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  terms: false,
};

function SignUp() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log(values);
        register(values);
      },
    });

  const register = (values) => {
    fetchSignInMethodsForEmail(auth, values.email)
      .then((signInMethods) => {
        if (signInMethods && signInMethods.length > 0) {
          // Email is already in use
          console.log("Email is already in use");
          toast.error("Email is already in use");
          // Handle the case where email is already registered
        } else {
          // Email is not in use, proceed with signup
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // User signed up successfully
              const user = userCredential.user;

              console.log("User signed up successfully", user);
              toast.success("Successfully created!", {
                position: "top-right", // Set position to top-right
              });
              navigate("/");
              const userData = {
                user_name: values.name, // Assuming values contains user's name
                user_email: user.email,
                user_id: user.uid,
              };
              setDoc(doc(db, "users", user.uid), userData)
                .then(() => {
                  console.log("User data stored successfully in Firestore");
                  // Handle further actions...
                })
                .catch((error) => {
                  console.error(
                    "Error storing user data in Firestore: ",
                    error
                  );
                  // Handle error...
                });

              // Handle further actions...
            })
            .catch((error) => {
              // Handle errors

              console.error("Error signing up:", error.message);
              toast.error("Email is already registered");
            });
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error checking email:", error.message);
      });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 h-10/12">
        <div className="flex flex-col items-center  px-6  mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-24 h-24 mt-8"
              src="https://media.licdn.com/dms/image/C4E0BAQFa4a4sDSQ2Tw/company-logo_200_200/0/1630621716683/flow_events_agency_logo?e=2147483647&v=beta&t=Jy5ZfBnCZL5SCCkQsGQNBPvTnZM6UbUs3NnHHBUq1Ww"
              alt="logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <p className="text-start text-red-500">{errors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    autoComplete="off"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-start text-red-500">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="text-start text-red-500">{errors.password}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    autoComplete="off"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="text-start text-red-500">
                      {errors.confirm_password}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 "
                      required=""
                      checked={values.terms}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300 text-start"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                    <div>
                      {errors.terms && touched.terms ? (
                        <p className="text-start text-red-500">
                          {errors.terms}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                  Already have an account?{" "}
                  <NavLink to="/login">
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </a>
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
