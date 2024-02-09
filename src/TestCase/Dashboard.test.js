import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { useApi } from "../utils/hooks"; // Assuming this is the correct import path for useApi
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from 'react-toastify';

// Mocking the useApi hook
jest.mock("../utils/hooks", () => ({
  useApi: jest.fn(),
}));
// jest.mock('react-toastify', () => ({
//     __esModule: true,
//     ...jest.requireActual('react-toastify'),
//     toast: jest.fn(),
//   }));

describe("Dashboard Component", () => {
  test("renders the dashboard properly", () => {
    const setFromMock = jest.fn();

    const mockedUseApi = useApi;

    mockedUseApi.mockReturnValue({
      setFrom: setFromMock,
    });

    render(
      <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Dashboard />
        </LocalizationProvider>
      </Router>
    );

    // Assert that the required elements are rendered
    expect(screen.getByRole('heading', { name: /Make your travel whishlist/i })).toBeInTheDocument();
    expect(screen.getByText(/Where are you flying?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Trip/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Return/i)).toBeInTheDocument();
    expect(screen.getByText(/Show Flights/i)).toBeInTheDocument();
  });

    test('submits form with valid data', () => {
        const setFromMock = jest.fn();

        const mockedUseApi = useApi;
    
        mockedUseApi.mockReturnValue({
          setFrom: setFromMock,
        });
      render(  <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Dashboard />
        </LocalizationProvider>
      </Router>);

      // Mock data
      const fromInput = screen.getByLabelText(/Select From/i);
      const toInput = screen.getByLabelText(/Select To/i);
      const showFlightsButton = screen.getByText(/Show Flights/i);

      // Populate form inputs
      fireEvent.change(fromInput, { target:  'New York' } );
    //   fireEvent.change(toInput, { target: { value: 'Los Angeles' } });

      // Submit form
      fireEvent.click(showFlightsButton);

      // Assert that form is submitted
      // Here you can add assertions to check if the navigation has happened correctly
    });

   
});
