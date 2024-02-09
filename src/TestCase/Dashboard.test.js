import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders dashboard form and submits correctly', () => {
  const { getByLabelText, getByText } = render(
    <Router>
      <Dashboard />
    </Router>
  );

  fireEvent.change(getByLabelText('Select From'), { target:  'New York'  });
  fireEvent.change(getByLabelText('Select To'), { target:  'London'  });

  
  fireEvent.submit(getByText('Show Flights'));


});
