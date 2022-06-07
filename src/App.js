import './App.css';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableHead, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

// import Box from '@mui/material/Box';
// eslint-disable-next-line react/prop-types
const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      type="search"
      inputProps={{ pattern: '[0-9]*' }}
      value={value}
      className="form-control form-control-lg"
      placeholder="Search..."
      onChange={(e) =>
        onChange(
          // e.target.value
          e.target.validity.valid ? e.target.value : '',
        )
      }
    />
  );
};
function App() {
  const [isPending, setIsPending] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  // const [disabled, setDisabled] = useState(true);
  const searchChangeHandler = (query) => {
    setSearchQuery(query);
  };

  let rowsPerPage = 5;
  let disabled = true;
  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const series = await fetch('https://reqres.in/api/products', {
          method: 'GET',
          redirect: 'follow',
        });
        const resJson = await series.json();
        if (series.status === 200) {
          setProductsData(resJson.data);
          setIsPending(false);
          console.log(resJson);
        } else {
          alert('bu');
        }
      } catch (error) {
        alert('buuuu');
      }
    }
    fetchSeriesData();
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsData.length) : 0;

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  let searchResult;
  if (searchQuery) {
    searchResult = productsData.filter((post) => post.id == searchQuery);
  }
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      {isPending && <h1>Loading...</h1>}
      <SearchBar value={searchQuery} onChange={searchChangeHandler} />

      {!isPending && (
        <>
          <TableContainer
            component={Paper}
            style={{ maxWidth: '31.25rem', maxHeight: '25rem' }}
          >
            <Table
              style={{ width: 'maxContent' }}
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
              {/* <TableBody style={{ backgroundColor: 'yellow' }}>
              {(rowsPerPage && !searchQuery */}
              <TableBody style={{ backgroundColor: 'wheat' }}>
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
                      style={{ width: 'maxContent' }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 'maxContent',
                        borderCollapse: 'collapse',
                      }}
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 'maxContent' }} align="center">
                      {row.year}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && !searchResult && (
                  <TableRow style={{ height: 53 * emptyRows }}>
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
                    // disabled
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      // disabled: disabled,
                    }}
                    onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    //ActionsComponent={TablePaginationActions}
                    //component={Box}
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
          {searchQuery ? (
            searchResult.length === 0 ? (
              'No data found'
            ) : (
              <>
                <h1>Results:</h1> {searchResult.length}
              </>
            )
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}

export default App;
