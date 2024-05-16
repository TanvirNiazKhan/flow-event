import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/layouts/Nav";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Career from "./pages/Career";
import Login from "./pages/Login";
import HirePhotographer from "./pages/HirePhotographer";
import { Footer } from "flowbite-react";
import Footers from "./components/layouts/Footers";
import Contact from "./pages/Contact";
import Event from "./pages/Event";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase/firebase";
import { useStateValue } from "../src/contexts/StateProvider";
import TabsRender, { TabsWithIcon } from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import { EventPage } from "./pages/EventPage";
function App() {
  const [{ user }, dispatch] = useStateValue();

  // Listen for authentication state changes
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (auth_user) => {
      if (auth_user) {
        // User is signed in, fetch additional user information from Firestore
        const userDoc = await getDoc(doc(db, "users", auth_user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // console.log(userData);
          dispatch({ type: "SET_USER", user: userData });
          console.log("from app:", user);
        }
      }
      // else {
      //   // No user is signed in
      //   dispatch({ type: "CLEAR_USER" });
      // }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/career" element={<Career />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hirePhotographer" element={<HirePhotographer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/event" element={<Event />} />
          <Route path="/profile" element={<TabsRender />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event/createEvent" element={<CreateEvent />} />
          <Route path="/event/eventPage" element={EventPage} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
