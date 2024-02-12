import React, { useState } from "react";
import dayjs from "dayjs";
import emirats from "../../assets/emitates.png";
import { useApi } from "../../utils/hooks";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function FlightsCard({ flightDetails }) {
  // const navigate = useNavigate();
  const { setVisiblestate, setFlightId } = useApi();
  return (
    <>
      {flightDetails &&
        flightDetails?.map((flight, index) => (
          <div data-testid="flights-card" key={index}
            className="flex w-[100%] flex-col lg:flex-row md:my-2  md:ml-2 md:p-3  bg-white  border border-gray-200 rounded-lg shadow md:flex-row "
            // className="flex m-2 p-3 self-start  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
            // onClick={() => navigate(`/flightBooking/${flight?.id}`)}
          >
            <div className="lg:w-[25%] flex justify-center items-center">
              <img src={emirats} alt=" flight logo" />
            </div>
            <div className="flex  w-full  flex-col p-3">
              <div className="flex justify-between mx-5 ">
                {/* left box */}
                <div className="hidden md:flex items-center">
                  <div className="flex justify-center items-cnter border rounded  border-[#8DD3BB] ">
                    <h1 className="p-2">4.2</h1>
                  </div>
                  <div className="flex items-center p-2 ">
                    <h1 className="font-semibold text-[14px] font-medium pr-2">
                      Very Good
                    </h1>
                    <h1 className=" font-semibold text-[12px] font-medium">
                      54 Reviews
                    </h1>
                  </div>
                </div>
                {/* right corner */}
                <div className="flex flex-col ">
                  <h1>Starting from</h1>
                  <h1 className="text-[#FF8682] text-[24px] font-semibold ">
                    ₹ {flight?.fare}
                  </h1>
                </div>
              </div>
              {/* -------------------------- */}
              <div className="border-b pb-5">
                <div className="py-2">
                  <div className="flex w-[100%] lg:w-[60%] justify-around items-center">
                    <div className="flex">
                      <h1 className="font-semibold pr-3 text-[20px] ">
                        {dayjs(flight?.displayData?.source?.depTime).format(
                          "hh-mm"
                        )}
                      </h1>
                      -
                      <h1 className="font-semibold  pl-3 text-[20px]">
                        {dayjs(flight?.displayData?.destination.arrTime).format(
                          "hh-mm"
                        )}
                      </h1>
                    </div>

                    <h6 className="text-[18px] font-semibold">
                      {flight?.displayData?.stopInfo}
                    </h6>

                    <h6 className="text-[20px]  font-semibold text-grey">
                      {flight?.displayData?.totalDuration}
                    </h6>
                  </div>
                  <div className="flex justify-between w-[100%] lg:w-[60%]">
                    <h1 className="  text-sm ml-8">
                      {flight?.displayData?.airlines[0].airlineName}
                    </h1>
                    <h3 className="text-sm">
                      Airline Code :{" "}
                      {flight?.displayData?.airlines[0].airlineCode}
                    </h3>
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex w-[100%] lg:w-[60%] justify-around items-center">
                    <div className="flex">
                      <h1 className="font-semibold pr-3 text-[20px] ">
                        {dayjs(flight.displayData?.source.depTime).format(
                          "hh-mm"
                        )}
                      </h1>
                      -
                      <h1 className="font-semibold  pl-3 text-[20px]">
                        {dayjs(flight?.displayData?.destination.arrTime).format(
                          "hh-mm"
                        )}
                      </h1>
                    </div>

                    <h6 className="text-[18px] font-semibold">
                      {flight?.displayData?.stopInfo}
                    </h6>

                    <h6 className="text-[20px]  font-semibold text-grey">
                      {flight?.displayData?.totalDuration}
                    </h6>
                  </div>
                  <div className="flex justify-between w-[100%] lg:w-[60%]">
                    <h1 className="  text-sm ml-8">
                      {flight?.displayData?.airlines[0].airlineName}
                    </h1>
                    <h3 className="text-sm">
                      Airline Code :{" "}
                      {flight?.displayData?.airlines[0].airlineCode}
                    </h3>
                  </div>
                </div>
              </div>
              {/* ------------------------- */}
              <div className="flex m-4 justify-around">
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
                <button
                  type="button"
                  className=" flex grow justify-center items-center bg-[#8DD3BB] font-[14px] font-medium rounded  "
                  onClick={() => {
                    setVisiblestate(true);
                    setFlightId(flight.id);
                  }}
                >
                  view Deals
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default FlightsCard;
