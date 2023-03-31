const getCurrentProductState = (state) => state.commerce.product.current;

// STANDARD SELECTORS
export const selectIsProductFetching = (state) => getCurrentProductState(state).isFetching;
export const selectProduct = (state) => getCurrentProductState(state).entity;
export const selectProductQuantity = (state) => getCurrentProductState(state).quantity;

export const selectProductPriceId = (state) => selectProduct(state).priceId;
export const selectProductName = (state) => selectProduct(state).name;
export const selectProductLastOrderByUser = (state) => selectProduct(state).lastOrderByUser;
export const selectProductImageURLs = (state) => selectProduct(state).imageURLs;
export const selectProductDescription = (state) => selectProduct(state).description;
export const selectProductFeatures = (state) => selectProduct(state).features;
export const selectProductRating = (state) => selectProduct(state).rating;
export const selectProductLastPurchasedAt = (state) => selectProduct(state).lastPurchasedAt;
export const selectProductPrice = (state) => selectProduct(state).price;
export const selectProductStockCount = (state) => selectProduct(state).stockCount;
export const selectProductRatingCount = (state) => selectProduct(state).rating.count;
