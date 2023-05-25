import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Product from "../types/Product";

interface CartProduct {
  productId: number;
  count: number;
}

interface CartReducer {
  products: CartProduct[];
}

const initialState: CartReducer = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      if (
        state.products.find(
          (cartProduct) => cartProduct.productId === action.payload.id
        )
      )
        return;

      state.products.push({ productId: action.payload.id, count: 1 });
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (cartProduct) => cartProduct.productId !== action.payload
      );
    },
    updateCartProduct: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      const cartProduct = state.products.find(
        (cartPr) => cartPr.productId === action.payload.id
      );
      if (!cartProduct) return;
      const newCount = cartProduct.count + action.payload.count;
      if (newCount < 1) return;
      cartProduct.count = newCount;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addProductToCart, removeProductFromCart, updateCartProduct } =
  cartSlice.actions;
export default cartReducer;
