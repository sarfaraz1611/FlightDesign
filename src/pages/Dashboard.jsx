import React from "react";
import flower from "../assets/plane.jpg";
import Rocket from "../assets/png/Paper Plane.png";
import { useApi } from "../utils/hooks";
import { DatePicker } from "@mui/x-date-pickers";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Dashboard() {
  const {
    from,
    setFrom,
    to,
    setTo,
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,
    checked,
    setChecked,
    destinationCountriesTo,
    destinationCountriesFrom,
    Stops,
  } = useApi();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      from: from,
      to: to,
      departDate: dayjs(departDate).format("YYYY-MM-DD"),
      returnDate: dayjs(returnDate).format("YYYY-MM-DD"),
      checked,
    };
    console.log("Form submitted:", { formData });
    navigate("/flights", { state: formData });
  };

  return (
    <>
      <div
        className="relative h-[75vh] overflow-scroll pt-[50px] flex flex-col  "
        style={{
          // background-image:linear-gradient(45deg, #00234D 63% , #00234D 0%)
          backgroundImage: `url(${flower})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="  ml-[10%]  mt-[20vh]">
          <h1
            className="font-semibold text-white w-2/3 lg:w-[40%] "
            style={{
              // fontFamily: "TradeGothic LT Extended",
              fontSize: "min(45px,6vw)",
            }}
          >
            Make your travel whishlist, we’ll do the rest
          </h1>
          <p
            className="  font-medium text-white lg:mt-6"
            style={{
              //  fontFamily: "Montserrat/Medium/20px",
              fontSize: "min(20px,4vw)",
            }}
          >
            Special offers to suit your plan
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex  justify-center mt-[-10%] sm:mt-[-20px] 2xl:mt-[-60px] "
      >
        <div className="flex shadow-md  w-[80vw] gap-[20px] flex-col justify-center relative bg-white rounded-2xl p-5">
          <h1 className="text-[#112211] text-[20px] font-medium">
            Where are you flying?{" "}
          </h1>

          <div className="flex flex-col  lg:flex-row mb-5">
            <div className="flex mb-2 lg:mb-0 lg:mr-2 flex-col lg:py-3 bg-white rounded-md min min-w-[20%]">
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

            <div className="flex mb-2 lg:mb-0 lg:mr-2 flex-col lg:py-3 bg-white rounded-md min min-w-[20%] ">
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
            <div className="flex mb-2 lg:mb-0  flex-col lg:py-3 bg-white rounded-md min min-w-[20%] ">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Stops}
                value={checked}
                onChange={(event, value) => {
                  setChecked(value);
                }}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Trip" />}
              />
            </div>
            <div className="flex lg:mx-2 flex-col  lg:flex-row  bg-white rounded-md lg:p-[10px] min-w-[30%]   ">
              <div className="flex mb-3 flex-col bg-white rounded-3xl lg:mr-2  border-2xl min-w-[40%] ">
                <DatePicker
                  label={"Departure"}
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
          </div>
          <div className="flex  justify-end">
            <p   className=" flex   rounded font-[14px] items-center  p-3  mr-5  text-[#112211] ">
              + Add Promo Code
            </p>
            <button
              type="submit"
              className=" flex   rounded font-[14px] items-center  bg-[#8DD3BB] p-3  text-[#112211] "
            >
              <img src={Rocket} className="pr-2 " /> Show Flights
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Dashboard;
