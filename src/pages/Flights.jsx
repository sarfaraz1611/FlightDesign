import React, { useState, useEffect } from "react";
import { useApi } from "../utils/hooks";

import FlightsCard from "../Component/card";

import dayjs from "dayjs";
import Rocket from "../assets/png/style_layer.png";
import { DatePicker } from "@mui/x-date-pickers";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import FlightDetail from "../Component/FlightModal";
import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
function Flights() {
  const location = useLocation();
  const formData = location.state;

  const {
    from,
    setFrom,
    to,
    setTo,
    Stops,
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,
    checked,
    setChecked,
    filteredFlights,
    destinationCountriesTo,
    destinationCountriesFrom,
    filterFlihts,
    setFilterFlights,
    visiblestate,
    setVisiblestate,
  } = useApi();

  let flightdata = filteredFlights(formData);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Emirates", isChecked: false },
    { id: 2, label: "Fly Dubai", isChecked: false },
    { id: 3, label: "Qatar ", isChecked: false },
    { id: 4, label: "Etihad ", isChecked: false },
  ]);

  /**
   * Handles the form submission event.
   * @param {Event} e - The form submission event.
   * @returns None
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      from: from,
      to: to,
      departDate: dayjs(departDate).format("YYYY-MM-DD"),
      returnDate: dayjs(returnDate).format("YYYY-MM-DD"),
      checked,
    };

    /**
     * Validates the form data and sets the filtered flights based on the provided criteria.
     * If any required fields are missing or the form data is invalid, an error toast is displayed.
     * @param {{string}} from - The departure location.
     * @param {{string}} to - The destination location.
     * @param {{string}} departDate - The departure date.
     * @param {{string}} returnDate - The return date (optional for one-way flights).
     * @param {{string}} checked - The selected flight type (e.g., "Round Trip", "One Way").
     * @returns None
     */
    if (
      !from ||
      !to ||
      !departDate ||
      (!returnDate && checked?.value == "Round Trip")
    ) {
      toast.error("Please fill in all required fields.");
      return;
    } else {
      flightdata = filteredFlights(formData);
      setFilterFlights(flightdata);
    }
  };

  useEffect(() => {
    setFilterFlights(flightdata);
  }, []);

  /**
   * Handles the change event of a checkbox.
   * @param {{string}} id - The id of the checkbox that was changed.
   * @returns None
   */
  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, isChecked: !checkbox.isChecked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <div className="  lg:min-h-screen bg-[#fafbfc]  ">
      <div className=" flex flex-col justify-center ">
        <div className=" lg:sticky mt-[11%]  z-[99] ">
          <form
            onSubmit={handleSubmit}
            className="flex  justify-center  2xl:mt-[-80px] "
          >
            <div className="flex shadow-md  w-[90vw] gap-[20px] flex-col justify-center relative bg-white rounded-lg p-5">
              <div className="flex flex-col  lg:flex-row ">
                <div className="flex mb-2 lg:mb-0 lg:mr-2 flex-col lg:py-3 bg-white rounded-md  min-w-[20%]">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={destinationCountriesFrom}
                    value={from}
                    onChange={(event, value) => {
                      setFrom(value);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select From" />
                    )}
                  />
                </div>

                <div className="flex mb-2 lg:mb-0 lg:mr-2 flex-col lg:py-3 bg-white rounded-md  min-w-[20%] ">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={destinationCountriesTo.filter((place) => {
                      return place !== from;
                    })}
                    value={to}
                    onChange={(event, value) => {
                      setTo(value);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select To" />
                    )}
                  />
                </div>
                <div className="flex mb-2 lg:mb-0  flex-col lg:py-3 bg-white rounded-md min min-w-[10%] ">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Stops}
                    value={checked}
                    onChange={(event, value) => {
                      setChecked(value);
                    }}
                    // sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Trip" />
                    )}
                  />
                </div>
                <div className="flex lg:mx-2 flex-col  lg:flex-row  bg-white rounded-md lg:p-[10px] min-w-[30%]   ">
                  <div className="flex mb-3 flex-col bg-white lg:mr-2 rounded-3xl  border-2xl min-w-[40%] ">
                    <DatePicker
                      label={"Depurture"}
                      className="border-0"
                      value={departDate}
                      minDate={dayjs()}
                      onChange={(newValue) => setDepartDate(newValue)}
                    />
                  </div>

                  <div className="flex flex-col bg-white rounded-3xl    border-2xl min-w-[40%]">
                    <DatePicker
                      label={"Return"}
                      value={returnDate}
                      minDate={departDate}
                      onChange={(newValue) => setReturnDate(newValue)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className=" flex rounded  items-center mt-2 lg:mt-[-8px]  text-[#112211] "
                >
                  <img src={Rocket} className="pr-2 " />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex mx-10 mt-5 justify-center">
          {/* sidebar */}
          <div className="  hidden lg:flex  bg-white flex-col w-[20%] h-screen  pr-6 border-r shadow-md rounded-lg p-4 ">
            <h1 className="font-semibold  font-medium text-[20px]">Filters</h1>
            <div>
              <div className="flex -">
                <h1 className="text-[16px] font-medium  font-semibold p-2">
                  Price
                </h1>
                {/* <KeyboardArrowUpIcon /> */}
              </div>
              <div className=" p-2 mr-4">
                <Slider
                  size="small"
                  defaultValue={70}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </div>
              <hr />
            </div>
            <div>
              <div className="flex ">
                <h1 className="text-[16px] font-medium  font-semibold p-2">
                  Departure Time
                </h1>
                {/* <KeyboardArrowUpIcon /> */}
              </div>
              <div className=" p-2 mr-4">
                <Slider
                  size="small"
                  defaultValue={70}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </div>
              <hr />
            </div>
            <div>
              <h1 className="text-xl font-semibold p-2">AirLines</h1>
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id} className="m">
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    checked={checkbox.isChecked}
                    onChange={() => handleCheckboxChange(checkbox.id)}
                  />
                  <label
                    className="ml-2 text-[14px] font-normal"
                    htmlFor={checkbox.id}
                  >
                    {checkbox.label}
                  </label>
                </div>
              ))}

              <hr className="mt-4" />
            </div>
            <div>
              <h1 className="text-xl font-semibold p-2">Trips</h1>
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id} className="m">
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    checked={checkbox.isChecked}
                    onChange={() => handleCheckboxChange(checkbox.id)}
                  />
                  <label
                    className="ml-2 text-[14px] font-normal"
                    htmlFor={checkbox.id}
                  >
                    {checkbox.label}
                  </label>
                </div>
              ))}

              <hr className="mt-4" />
            </div>
          </div>

          {/* caard */}
          <div className=" w-[75%] ">
            <div className="   bg-white  hidden md:flex   md:flex-row justify-around  ml-2 shadow-md rounded-lg  ">
              <div className="p-4 ">
                <h1 className="text-[19px] font-medium text-[#112211]">
                  Cheapest
                </h1>
                <h1 className="text-[14px] font-light text-[#112211]">
                  ₹99,2h 18m
                </h1>
              </div>
              <div className="border m-3"></div>
              <div className="p-4 ">
                <h1 className="text-[19px] font-medium text-[#112211]">Best</h1>
                <h1 className="text-[14px] font-light text-[#112211]">
                  ₹99,2h 18m
                </h1>
              </div>
              <div className="border m-3"></div>
              <div className="p-4 ">
                <h1 className="text-[19px] font-medium text-[#112211]">
                  Quickest
                </h1>
                <h1 className="text-[14px] font-light text-[#112211]">
                  ₹99,2h 18m
                </h1>
              </div>
              <div className="border m-3"></div>
              <div className="p-4 ">
                <h1 className="  text-[19px] font-medium text-[#112211]">
                  Other Sort
                </h1>
              </div>
            </div>

            <div className="flex justify-center  flex-wrap   ">
              {filterFlihts.length == 0 ? (
                <h1 className=" text-bold text-[40px]  mt-10 font-2xl text-[#0F1035] ">
                  No Flights Found
                </h1>
              ) : (
                <FlightsCard flightDetails={filterFlihts} />
              )}
            </div>
          </div>
        </div>
      </div>
      {visiblestate && (
        <FlightDetail
          open={visiblestate}
          handleCancel={() => setVisiblestate(false)}
          // handleLogoutClick={handleLogoutClick}
        />
      )}
    </div>
  );
}

export default Flights;
