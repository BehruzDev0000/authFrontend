import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../@types/ProductType";

const initialState: { likedProductIds: number[]; likedProducts: ProductType[] } = {
  likedProductIds: [],
  likedProducts: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleLike: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      const productId = product.id;
      const exists = state.likedProductIds.includes(productId);

      if (exists) {
        return;
      }

      state.likedProductIds.push(productId);
      state.likedProducts.push(product);
    },
    handleUnlike: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      state.likedProductIds = state.likedProductIds.filter((id) => id !== productId);
      state.likedProducts = state.likedProducts.filter((product) => product.id !== productId);
    },
  },
});

export const { handleLike, handleUnlike } = ProductSlice.actions;
