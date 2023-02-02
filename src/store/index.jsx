import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoadong.slice";
import productsSlice from "./slices/products.slice";
import addCartSlice from "./slices/addCart.slice";
import cartSlice from "./slices/cart.slice";

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
    addCart: addCartSlice,
    cart: cartSlice,
  },
});
