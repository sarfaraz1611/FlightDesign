import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../Component/navbar';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders navbar and navigates on logo click', () => {
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );

  // Check if the navbar renders correctly
  const logo = getByText('GetSetGo');
  expect(logo).toBeInTheDocument();

  // Click on the logo
  fireEvent.click(logo);

  // Check if it navigates to the correct location (in this case, '/')
  expect(window.location.pathname).toBe('/');
});
