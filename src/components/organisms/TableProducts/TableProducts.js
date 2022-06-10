/* eslint-disable react/prop-types */

import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableHead } from '@mui/material';

import SearchBar from '../../Atoms/SearchBar/SearchBar';
import TableBodyProducts from './TableBodyProducts';

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
      {isPending && (
        <LinearProgress sx={{ width: '18.75rem', color: 'grey.500' }} />
      )}

      {!isPending && (
        <>
          <SearchBar value={searchQuery} onChange={searchChangeHandler} />
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: '25rem',
            }}
          >
            <Table aria-label="custom pagination table" align="center">
              <TableHead
                sx={{ backgroundColor: '#64646480', width: 'fitContent' }}
              >
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">YEAR</TableCell>
                </TableRow>
              </TableHead>

              <TableBodyProducts
                rowsPerPage={rowsPerPage}
                searchQuery={searchQuery}
                productsData={productsData}
                page={page}
                searchResult={searchResult}
                emptyRows={emptyRows}
                sx={{ width: 'fitContent' }}
              />
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

TableProducts.propTypes = {
  productsData: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  searchQuery: PropTypes.string,
  isPending: PropTypes.bool,
  searchChangeHandler: PropTypes.func,
  searchResult: PropTypes.array,
  emptyRows: PropTypes.number,
  handleChangePage: PropTypes.func,
  disabled: PropTypes.bool,
};
export default TableProducts;
