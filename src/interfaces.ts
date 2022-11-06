export interface SearchBarInterface {
  value: string;
  onChange: (value: string) => void;
}

export interface TableBodyProductsInterface {
  rowsPerPage: number;
  searchQuery: string;
  productsData: ProductsDataInterface[];
  page: number;
  searchResult: ProductsDataInterface[];
  emptyRows: number;
  sx: {
    width: string;
  };
}

export interface ProductsDataInterface {
  id: number;
  name: string;
  year: number;
  color: string;
  setSearchParams: object;
}

export interface TableProductsInterface {
  productsData: ProductsDataInterface[];
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  isPending: boolean;
  searchChangeHandler: (value: string) => void;
  searchResult: ProductsDataInterface[];
  emptyRows: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => void;
  disabled: boolean;
}
