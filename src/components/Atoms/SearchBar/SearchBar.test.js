import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import SearchBar from './SearchBar';

test('renders searchBar placeholder', () => {
  render(
    <Router>
      <SearchBar />
    </Router>,
  );
  const searcharea = screen.getByPlaceholderText('Only numbers allowed');
  expect(searcharea).toBeInTheDocument();
});
