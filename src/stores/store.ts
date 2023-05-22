import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/userReducer";
import cartReducer from "../reducers/cartReducer";
import productReducer from "../reducers/productReducer";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
    productReducer: productReducer,
  },
});

export default store;
