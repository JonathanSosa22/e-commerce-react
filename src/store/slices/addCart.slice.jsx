import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoadong.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";

export const addCartSlice = createSlice({
  name: "addCart",
  initialState: [],
  reducers: {
    setAddCart: (state, action) => {
      return action.payload;
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((resp) => dispatch(setAddCart(resp.data.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (cart) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post("https://e-commerce-api.academlo.tech/api/v1/cart", cart, getConfig())
    .then((resp) => dispatch(getCartThunk()))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setAddCart } = addCartSlice.actions;

export default addCartSlice.reducer;
