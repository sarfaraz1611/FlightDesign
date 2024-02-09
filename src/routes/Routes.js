import React from "react";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Flights from "../pages/Flights";
import Navbar from "../Component/navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoutesContainer() {
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
