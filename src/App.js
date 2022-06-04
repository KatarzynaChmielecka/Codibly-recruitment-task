import './App.css';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

// import Box from '@mui/material/Box';

function App() {
  const [isPending, setIsPending] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      {isPending && <h1>Loading...</h1>}

      {!isPending && (
        <TableContainer component={Paper} style={{ maxWidth: '500px' }}>
          <Table
            style={{ width: 'maxContent' }}
            aria-label="custom pagination table"
          >
            <TableBody style={{ backgroundColor: 'yellow' }}>
              {(rowsPerPage > 0
                ? productsData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : productsData
              ).map((row) => (
                <TableRow key={row.id} sx={{ backgroundColor: row.color }}>
                  <TableCell
                    component="th"
                    scope="column"
                    style={{ width: 'maxContent' }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 'maxContent' }} align="center">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 'maxContent' }} align="center">
                    {row.year}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={productsData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  //ActionsComponent={TablePaginationActions}
                  //component={Box}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  showFirstButton={true}
                  showLastButton={true}
                  labelRowsPerPage={<span>Rows:</span>}
                  sx={{
                    '.MuiTablePagination-toolbar': {
                      backgroundColor: 'rgba(100,100,100,0.5)',
                    },
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-input':
                      {
                        fontWeight: 'bold',
                        color: 'blue',
                      },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default App;
