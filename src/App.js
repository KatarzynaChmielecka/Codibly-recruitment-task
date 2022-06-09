import './App.css';

import { Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import TableProducts from './components/organisms/TableProducts/TableProducts';

function App() {
  const [isPending, setIsPending] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  let rowsPerPage = 5;
  let disabled = true;

  const searchChangeHandler = (query) => {
    setSearchQuery(query);
    setSearchParams({ query }, { replace: true });
  };

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const products = await fetch(
          'https://reqres.in/api/products?per_page=12?page=1',
          {
            method: 'GET',
            redirect: 'follow',
          },
        );
        const resJson = await products.json();
        if (products.status === 200) {
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
    fetchProductsData();
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsData.length) : 0;

  const handleChangePage = (event, pageNumber) => {
    event.preventDefault();
    setPage(pageNumber);
    setSearchParams({ pageNumber }, { replace: true });
  };

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
      {searchQuery ? (
        searchResult.length === 0 ? (
          <>
            <h1>No data found</h1>

            <Link href="/">Go back to home page</Link>
          </>
        ) : (
          <>
            <TableProducts
              productsData={productsData}
              page={page}
              rowsPerPage={rowsPerPage}
              searchQuery={searchQuery}
              isPending={isPending}
              searchChangeHandler={searchChangeHandler}
              searchResult={searchResult}
              emptyRows={emptyRows}
              handleChangePage={handleChangePage}
              disabled={disabled}
              searchParams={searchParams}
            />
            <Typography>Results: {searchResult.length}</Typography>
            <Typography>
              You choose product with id {searchParams.get('query')}. Maybe you
              want to check something else?
            </Typography>
          </>
        )
      ) : (
        <TableProducts
          productsData={productsData}
          page={page}
          rowsPerPage={rowsPerPage}
          searchQuery={searchQuery}
          isPending={isPending}
          searchChangeHandler={searchChangeHandler}
          searchResult={searchResult}
          emptyRows={emptyRows}
          handleChangePage={handleChangePage}
          disabled={disabled}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}

export default App;
