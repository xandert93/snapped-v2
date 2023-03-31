import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useURLParams } from '../../../hooks';

import { useEffect } from 'react';

import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { Pagination } from '@material-ui/lab';

import { PATHS } from '../../../constants/routing-constants';
import { genQueryString } from '../../../utils/formatters/location-formatters';
import {
  selectAreProductsFetching,
  selectProductsPageCount,
} from '../../../features/commerce/product/state/products/products-selectors';
import { fetchOneTimeProducts } from '../../../features/commerce/product/state/products/products-actions';
import { ProductList, ProductsSortButton } from '../../../features/commerce/product/components';

export const ShopPage = () => {
  const { page: paramsPageNum, sort } = useURLParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const isFetching = useSelector(selectAreProductsFetching);
  const pageCount = useSelector(selectProductsPageCount);

  const [pageNum, setPageNum] = useState(Number(paramsPageNum));

  useEffect(() => {
    dispatch(fetchOneTimeProducts({ page: pageNum, sort }));
  }, [pageNum, sort]);

  const handlePageChange = (e, newPageNum) => {
    setPageNum(newPageNum);

    history.push({
      path: PATHS.SHOP,
      search: genQueryString({ sort, page: newPageNum }),
    });
  };

  return (
    <>
      <h1>Shop</h1>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <ProductsSortButton />
          <ProductList />
        </>
      )}
      {pageCount > 1 && <Pagination page={pageNum} count={pageCount} onChange={handlePageChange} />}
    </>
  );
};
