import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ value, onChange }) => {
  const navigate = useNavigate();
  return (
    <TextField
      type="search"
      label="Search by id"
      inputProps={{ pattern: '[0-9]*' }}
      value={value}
      className="form-control form-control-lg"
      placeholder="Only numbers allowed"
      onChange={(e) => {
        onChange(e.target.validity.valid ? e.target.value : '');
        navigate({
          pathname: '/',
          search: '?pageNumber=0',
        });
      }}
      sx={{ marginBottom: '3.3125rem', width: '100%' }}
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default SearchBar;
