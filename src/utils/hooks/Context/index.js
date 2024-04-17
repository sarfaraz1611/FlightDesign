import dayjs from "dayjs";
import React, { useContext, createContext, useState, useEffect } from "react";

const authContext = createContext();

export const useApi = () => useContext(authContext);

function ProvideApi() {
  const [flightDetails, setFlightDetails] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [checked, setChecked] = useState("");
  const [filterflights, setFilterFlights] = useState(false);
  const [visiblestate, setVisiblestate] = useState(false);
  const [flightId, setFlightId] = useState(0);

  const url = " https://api.npoint.io/4829d4ab0e96bfab50e7";
  /**
   * Fetches data from the specified URL using the Fetch API.
   * @param {string} url - The URL to fetch data from.
   * @returns None
   * @throws {Error} If the network response is not ok.
   */
  function fetchApi(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setFlightDetails(data?.data.result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  useEffect(() => {
    fetchApi(url);
  }, []);

  /**
   * Filters an array of flight details based on the provided form data.
   * @param {object} formData - The form data object containing the filter criteria.
   * @returns {array} - An array of flight details that match the filter criteria.
   */
  function filteredFlights(formData) {
    const filtredFlightDetails = flightDetails.filter((flight) => {
      // console.log(formData, "insdei");
      const departureDate = dayjs(flight.displayData.source.depTime).format(
        "YYYY-MM-DD"
      );
      const destinationDate = dayjs(
        flight.displayData.destination.arrTime
      ).format("YYYY-MM-DD");

      return (
        (formData?.from === flight.displayData.source.airport.cityName &&
          formData?.to === flight.displayData.destination.airport.cityName) ||
        formData?.departDate === departureDate ||
        formData?.returnDate === destinationDate
      );
    });
    return filtredFlightDetails;
  }

  const destinationCountriesFrom = [];
  const destinationCountriesTo = [];

  /**
   * Iterates over an array of flight details and extracts the source and destination cities.
   * Adds the source city to the destinationCountriesFrom array if it is not already included.
   * Adds the destination city to the destinationCountriesTo array if it is not already included.
   * @param {Array} flightDetails - An array of flight details objects.
   * @returns None
   */

  flightDetails?.forEach((flight) => {
    const sourceCity = flight?.displayData.source.airport.cityName;
    const destinationCity = flight?.displayData.destination.airport.cityName;
    if (!destinationCountriesFrom.includes(sourceCity)) {
      destinationCountriesFrom.push(sourceCity);
    }
    if (!destinationCountriesTo.includes(destinationCity)) {
      destinationCountriesTo.push(destinationCity);
    }
  });

  const Stops = [
    { label: "One Way", value: "1 way" },
    { label: "Round Trip", value: "Round Trip" },
  ];

  return {
    flightDetails,
    filteredFlights,
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
    destinationCountriesFrom,
    destinationCountriesTo,
    filterflights,
    setFilterFlights,
    visiblestate,
    setVisiblestate,
    flightId,
    setFlightId,
    Stops,
    fetchApi,
  };
}

export function ProvideAuth({ children }) {
  const Api = ProvideApi();
  return <authContext.Provider value={Api}>{children}</authContext.Provider>;
}
