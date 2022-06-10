import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import HomePage from './HomePage';

test('renders welcome text', () => {
  render(
    <Router>
      <HomePage />
    </Router>,
  );
  const helloElement = screen.getByText('Hello Stranger!');

  expect(helloElement).toBeInTheDocument();
});

test('not', () => {
  render(
    <Router>
      <HomePage />
    </Router>,
  );

  const x = screen.queryByText('buba');

  expect(x).not.toBeInTheDocument();
});
