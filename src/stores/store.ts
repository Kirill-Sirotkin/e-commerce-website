import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/userReducer";
import cartReducer from "../reducers/cartReducer";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
  },
});

export default store;
