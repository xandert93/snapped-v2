// DERIVED SELECTORS

const getProductsState = (state) => state.commerce.product.products;

// STANDARD SELECTORS
export const selectAreProductsFetching = (state) => getProductsState(state).isFetching;
export const selectProducts = (state) => getProductsState(state).data;
export const selectProductsPageCount = (state) => getProductsState(state).pageCount;

// DERIVED SELECTORS
