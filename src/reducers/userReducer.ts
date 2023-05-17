import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Tokens from "../types/Tokens";
import UserCreateInfo from "../types/UserCreateInfo";
import UserCredentials from "../types/UserCredentials";

const initialState: Tokens = { access_token: "", refresh_token: "" };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<UserCreateInfo>) => {
      state = {
        access_token: action.payload.name,
        refresh_token: action.payload.email,
      };
    },
    loginUser: (state, action: PayloadAction<UserCredentials>) => {},
  },
});

const userReducer = userSlice.reducer;
export const { registerUser, loginUser } = userSlice.actions;
export default userReducer;
