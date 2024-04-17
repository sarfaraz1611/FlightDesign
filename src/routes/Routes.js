import React, { useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Flights from "../pages/Flights";
import Navbar from "../Component/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import amplitude from "amplitude-js";
function RoutesContainer() {
  useEffect(() => {
    // Initialize Amplitude with your API Key
    amplitude.getInstance().init("62e304b7fcb6fbb59ceeac87c4f44e6d");

    // Optionally, set user properties or get the user ID
    var userId = amplitude.getInstance();
    amplitude.getInstance().logEvent("Flight Checked");
    console.log("User ID:", userId);
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default RoutesContainer;
