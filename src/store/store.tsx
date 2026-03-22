import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./ProductClice";

const store = configureStore({
  reducer: {
    product: ProductSlice.reducer,
  },
});

export default store;
