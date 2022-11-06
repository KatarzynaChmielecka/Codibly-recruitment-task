import { TableBody, TableCell, TableRow } from '@mui/material';

import { TableBodyProductsInterface } from '../../../interfaces';

const TableBodyProducts = ({
  rowsPerPage,
  searchQuery,
  productsData,
  page,
  searchResult,
  emptyRows,
}: TableBodyProductsInterface) => {
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

export default TableBodyProducts;
