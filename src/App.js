// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Meine React App mit Chart.js/i);
  expect(headingElement).toBeInTheDocument();
});


