import React from 'react';
import { render } from '@testing-library/react';
import FlightsCard from '../Component/card/index';
import { useApi } from "../utils/hooks";

// Mocking the flight data
const flightDetailsMock = [
    {
    
                    "id": "1",
                    "fare": 3840,
                    "displayData": {
                        "source": {
                            "airport": {
                                "cityCode": "DEL",
                                "cityName": "Delhi",
                                "terminal": "3",
                                "airportCode": "DEL",
                                "airportName": "Indira Gandhi Airport",
                                "countryCode": "IN",
                                "countryName": "India"
                            },
                            "depTime": "2023-03-31T06:20"
                        },
                        "airlines": [
                            {
                                "airlineCode": "AB",
                                "airlineName": "JetSpice",
                                "flightNumber": "1234"
                            }
                        ],
                        "stopInfo": "Non stop",
                        "destination": {
                            "airport": {
                                "cityCode": "BOM",
                                "cityName": "Mumbai",
                                "terminal": "2",
                                "airportCode": "BOM",
                                "airportName": "Mumbai",
                                "countryCode": "IN",
                                "countryName": "India"
                            },
                            "arrTime": "2023-03-31T08:40"
                        },
                        "totalDuration": "2h 20m"
                    }
                }
        
];
jest.mock("../utils/hooks", () => ({
    ...jest.requireActual("../utils/hooks"),
    useApi: jest.fn(() => ({
      fetchApi: jest.fn(),
        filteredFlights: jest.fn(),
        setVisiblestate:jest.fn(),
    })),
  }));


describe('Flights Component', () => {
    test('FlightsCard is displaying', () => {
        const setFromMock = jest.fn();

        const mockedUseApi = useApi;
        mockedUseApi.mockReturnValue({
            setVisiblestate: setFromMock,
          });
        
        // Render Flights component with mocked flight data
        const { getByTestId } = render(<FlightsCard flightDetails={flightDetailsMock} />);
      
        // Check if FlightsCard component is present in the document
        const flightsCard = getByTestId('flights-card');
        expect(flightsCard).toBeInTheDocument();
    });
    test('FlightsCard is not displaying', () => {
        const setFromMock = jest.fn();

        const mockedUseApi = useApi;
        mockedUseApi.mockReturnValue({
            setVisiblestate: setFromMock,
          });
        const { queryByTestId } = render(<FlightsCard flightDetails={[]} />);
        
        // Check if FlightsCard component is not present in the document
        const flightsCard = queryByTestId('flights-card');
        expect(flightsCard).toBeNull();
      });
})