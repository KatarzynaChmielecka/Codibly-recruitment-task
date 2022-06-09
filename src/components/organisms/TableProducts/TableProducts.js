import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableHead } from '@mui/material';

import SearchBar from '../../Atoms/SearchBar/SearchBar';

/* eslint-disable react/prop-types */
const TableProducts = ({
  productsData,
  page,
  rowsPerPage,
  searchQuery,
  isPending,
  searchChangeHandler,
  searchResult,
  emptyRows,
  handleChangePage,
  disabled,
}) => {
  return (
    <>
      {isPending && <LinearProgress sx={{ width: '50%', color: 'grey.500' }} />}

      {!isPending && (
        <>
          <SearchBar value={searchQuery} onChange={searchChangeHandler} />
          <TableContainer
            component={Paper}
            sx={{ maxWidth: '31.25rem', maxHeight: '25rem' }}
          >
            <Table
              sx={{ width: 'maxContent' }}
              aria-label="custom pagination table"
              align="center"
            >
              <TableHead sx={{ backgroundColor: '#64646480' }}>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">YEAR</TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: 'wheat' }}>
                {(rowsPerPage && !searchQuery
                  ? productsData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : searchResult
                ).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ backgroundColor: row.color }}
                    // searchQuery={searchQuery}
                  >
                    <TableCell
                      component="th"
                      scope="column"
                      align="center"
                      sx={{ width: 'maxContent' }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 'maxContent',
                        borderCollapse: 'collapse',
                      }}
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ width: 'maxContent' }} align="center">
                      {row.year}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && !searchResult && (
                  <TableRow sx={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    count={productsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                    }}
                    onPageChange={handleChangePage}
                    labelDisplayedRows={({ page }) => {
                      return `Page: ${page}`;
                    }}
                    backIconButtonProps={
                      productsData && searchQuery
                        ? {
                            disabled: disabled,
                          }
                        : undefined
                    }
                    nextIconButtonProps={
                      productsData && searchQuery
                        ? {
                            disabled: disabled,
                          }
                        : undefined
                    }
                    showFirstButton={
                      productsData && !searchQuery ? true : false
                    }
                    showLastButton={productsData && !searchQuery ? true : false}
                    labelRowsPerPage={<span>Rows:</span>}
                    sx={{
                      '.MuiTablePagination-toolbar': {
                        backgroundColor: '#64646480',
                      },
                      '.MuiTablePagination-selectLabel, .MuiTablePagination-input':
                        {
                          fontWeight: 'bold',
                          color: 'yellow',
                          display: 'none',
                        },
                      '.MuiSelect-icon': { display: 'none' },
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default TableProducts;
