import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoadong.slice";
import productsSlice from "./slices/products.slice";

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
  },
});
