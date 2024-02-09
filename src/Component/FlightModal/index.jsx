import React from "react";
import { BasicModal } from "../Modal";
import { useApi } from "../../utils/hooks";
import { Button } from "@mui/material";
// import CustomButton from "../../components/Button";

const FlightDetail = ({ open, handleCancel, handleLogoutClick }) => {
  const { flightDetails, flightId } = useApi();
  const FilteredById = flightDetails.filter((flight) => flight.id === flightId);

  return (
    <BasicModal open={open} close={handleCancel}>
      <div className="flex  flex-col p-[24px] lg:w-[30vw]">
        <div className="mb-3">
          <h2 className="font-bold text-2xl">Flight Details</h2>
        </div>
        <hr />

        <p>
          <strong>Flight Id:</strong>{" "}
          {FilteredById[0]?.id} 
        </p>
        <p>
          <strong>Source:</strong>{" "}
          {FilteredById[0]?.displayData?.source.airport.cityName} (
          {FilteredById[0]?.displayData.source.airport.airportCode})
        </p>
        <p>
          <strong>Departure Time:</strong>{" "}
          {FilteredById[0]?.displayData.source.depTime}
        </p>
        <p>
          <strong>Airline:</strong>{" "}
          {FilteredById[0]?.displayData.airlines[0].airlineName} (
          {FilteredById[0]?.displayData.airlines[0].airlineCode}) -{" "}
          {FilteredById[0]?.displayData.airlines[0].flightNumber}
        </p>
        <p>
          <strong>Stop Info:</strong> {FilteredById[0]?.displayData.stopInfo}
        </p>
        <p>
          <strong>Destination:</strong>{" "}
          {FilteredById[0]?.displayData.destination.airport.cityName} (
          {FilteredById[0]?.displayData.destination.airport.airportCode})
        </p>
        <p>
          <strong>Arrival Time:</strong>{" "}
          {FilteredById[0]?.displayData.destination.arrTime}
        </p>
        <p>
          <strong>Total Duration:</strong>{" "}
          {FilteredById[0]?.displayData.totalDuration}
        </p>

        <div className="flex justify-end">
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};

export default FlightDetail;
