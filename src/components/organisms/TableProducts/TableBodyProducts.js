import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';

const TableBodyProducts = ({
  rowsPerPage,
  searchQuery,
  productsData,
  page,
  searchResult,
  emptyRows,
}) => {
  return (
    <TableBody sx={{ backgroundColor: 'wheat' }}>
      {(rowsPerPage && !searchQuery
        ? productsData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          )
        : searchResult
      ).map((row) => (
        <TableRow key={row.id} sx={{ backgroundColor: row.color }}>
          <TableCell component="th" scope="column" align="center">
            {row.id}
          </TableCell>
          <TableCell
            sx={{
              borderCollapse: 'collapse',
            }}
            align="center"
          >
            {row.name}
          </TableCell>
          <TableCell align="center">{row.year}</TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && !searchResult && (
        <TableRow sx={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

TableBodyProducts.propTypes = {
  rowsPerPage: PropTypes.number,
  searchQuery: PropTypes.string,
  productsData: PropTypes.array,
  page: PropTypes.number,
  searchResult: PropTypes.array,
  emptyRows: PropTypes.number,
};
export default TableBodyProducts;
