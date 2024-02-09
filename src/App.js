import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ContextContainer from "./utils/context";

import RoutesContainer from "./routes/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


function App() {
  return (
    <>
      <ContextContainer>
        <Router>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RoutesContainer />
          </LocalizationProvider>
        </Router>
      </ContextContainer>
    </>
  );
}

export default App;
