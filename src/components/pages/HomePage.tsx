import toast from 'react-hot-toast';
import { Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import TableProducts from '../organisms/TableProducts/TableProducts';

export interface ProductsDataInterface {
  id: number;
  name: string;
  year: number;
  color: string;
  setSearchParams: object;
  searchParams: string | object;
}
const HomePage = () => {
  const [isPending, setIsPending] = useState(true);
  const [productsData, setProductsData] = useState<ProductsDataInterface[]>([]);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // URLSearchParams
  const navigate = useNavigate();
  const rowsPerPage = 5;
  const disabled = true;
  const params = new URLSearchParams(document.location.search);
  const pageNumberParams = parseInt(params.get('pageNumber') as string);
  useEffect(() => {
    async function fetchProductsData() {
      try {
        const products = await fetch(
          'https://reqres.in/api/products?per_page=12',
          {
            method: 'GET',
            redirect: 'follow',
          },
        );
        const resJson = await products.json();
        if (products.status === 200) {
          setProductsData(resJson.data);
          setIsPending(false);
          if (!pageNumberParams) {
            navigate({
              pathname: '/',
              search: '?pageNumber=0',
            });
          }
          toast.success('You can check ours products. Everything is ok 😀');
        } else {
          toast.error(
            "We couldn't fetch products data. Please try again later. 😒",
          );
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again later. 😒');
      }
    }
    fetchProductsData();
  }, []);

  const searchChangeHandler = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ query }, { replace: true });
  };

  const emptyRows =
    pageNumberParams >= 0
      ? Math.max(0, (1 + pageNumberParams) * rowsPerPage - productsData.length)
      : 0;

  const handleChangePage = (
    event: { preventDefault: () => void },
    pageNumber: string,
  ) => {
    event.preventDefault();

    setPage(pageNumberParams);
    setSearchParams({ pageNumber }, { replace: true });
  };

  let searchResult: ProductsDataInterface[] | string[] | null | undefined;

  if (searchQuery) {
    searchResult = productsData.filter((product) => product.id == +searchQuery);
  }

  return (
    <main>
      <p>Hello Stranger!</p>
      {searchQuery ? (
        searchResult?.length === 0 ? (
          <>
            <h1>No data found</h1>

            <Link href="/">Go back to home page</Link>
          </>
        ) : (
          <>
            <TableProducts
              productsData={productsData}
              page={pageNumberParams}
              rowsPerPage={rowsPerPage}
              searchQuery={searchQuery}
              isPending={isPending}
              searchChangeHandler={searchChangeHandler}
              searchResult={searchResult}
              emptyRows={emptyRows}
              handleChangePage={handleChangePage}
              disabled={disabled}
              // sx={undefined}
              // searchParams={searchParams}
            />
            <Typography
              sx={{
                marginTop: '3.3125rem',
              }}
            >
              Results: {searchResult?.length}
            </Typography>
            <Typography>
              You choose product with id {searchParams.get('query')}. Maybe you
              want to check something else?
            </Typography>
          </>
        )
      ) : (
        <TableProducts
          productsData={productsData}
          page={pageNumberParams}
          rowsPerPage={rowsPerPage}
          searchQuery={searchQuery}
          isPending={isPending}
          searchChangeHandler={searchChangeHandler}
          searchResult={searchResult}
          emptyRows={emptyRows}
          handleChangePage={handleChangePage}
          disabled={disabled}
          // searchParams={searchParams}
        />
      )}
    </main>
  );
};
export default HomePage;
