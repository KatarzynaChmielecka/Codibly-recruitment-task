import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      type="search"
      label="Search by id"
      inputProps={{ pattern: '[0-9]*' }}
      value={value}
      className="form-control form-control-lg"
      placeholder="Only numbers allowed"
      onChange={(e) => onChange(e.target.validity.valid ? e.target.value : '')}
      sx={{ marginBottom: '3.3125rem' }}
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default SearchBar;
