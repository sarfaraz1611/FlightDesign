import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { useApi } from "../utils/hooks"; // Assuming this is the correct import path for useApi
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ProvideAuth } from "../utils/hooks/Context/index";

jest.mock("../utils/hooks/Context/index", () => ({
  ...jest.requireActual("../utils/hooks/Context/index"), // Use actual implementations except for fetchApi
  fetchApi: jest.fn(),
}));

// Mocking the useApi hook
jest.mock("../utils/hooks", () => ({
  useApi: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

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
    expect(
      screen.getByRole("heading", { name: /Make your travel whishlist/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Where are you flying?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Trip/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Return/i)).toBeInTheDocument();
    expect(screen.getByText(/Show Flights/i)).toBeInTheDocument();
  });

  test("submits form with valid data", () => {
    const navigateMock = jest.fn();

    useNavigate.mockReturnValue(navigateMock);

    // Mock useApi hook to return setFromMock
    const setFromMock = jest.fn();
    useApi.mockReturnValue({ setFrom: setFromMock });

    render(
      <ProvideAuth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Dashboard />
        </LocalizationProvider>
      </ProvideAuth>
    );

    const fromInput = screen.getByLabelText(/Select From/i);
    const toInput = screen.getByLabelText(/Select To/i);
    const tripInput = screen.getByLabelText(/Trip/i);
    const departureInput = screen.getByLabelText(/Departure/i);
    const returnInput = screen.getByLabelText(/Return/i);
    const showFlightsButton = screen.getByText(/Show Flights/i);

    // Populate form inputs
    fireEvent.change(fromInput, { target: { value: "Mumbai" } });
    fireEvent.change(toInput, { target: { value: "Los Angeles" } });
    fireEvent.change(tripInput, { target: { value: "One Way" } });
    fireEvent.change(departureInput, { target: { value: "2024-02-10" } });
    fireEvent.change(returnInput, { target: { value: "2024-02-15" } });

    // Submit form
    fireEvent.click(showFlightsButton);
    // expect(navigateMock).toHaveBeenCalledWith('/flights?from=Mumbai&to=Los%20Angeles&trip=One%20Way&departure=2024-02-10&return=2024-02-15');
  });
});
