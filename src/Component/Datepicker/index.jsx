// CustomDatePicker.js
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import { IoCalendarOutline } from "react-icons/io5";

const CustomDatePicker = ({ selectedDate, onChange }) => {
  return (
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat='eee, dd MMM'
        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <IoCalendarOutline className="text-gray-400" />
      </div>
    </div>
  );
};

export default CustomDatePicker;
