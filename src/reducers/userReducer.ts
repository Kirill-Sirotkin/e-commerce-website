import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Tokens from "../types/Tokens";
import UserCreateInfo from "../types/UserCreateInfo";
import UserCredentials from "../types/UserCredentials";
import User from "../types/User";
import axios, { AxiosError } from "axios";

interface UserReducer {
  tokens?: Tokens;
  currentUser?: User;
  loading: boolean;
}

const initialState: UserReducer = {
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(registerUser.fulfilled, (state, action) => {
      console.log("registration finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.currentUser = action.payload;
      }
    });
    build.addCase(loginUser.fulfilled, (state, action) => {
      console.log("login finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.tokens = action.payload;
      }
    });
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (user: UserCreateInfo) => {
    console.log("REGISTER!");
    try {
      const result = await axios.post<User>(
        "https://api.escuelajs.co/api/v1/users/",
        user
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials: UserCredentials) => {
    console.log("LOGIN!");
    try {
      const result = await axios.post<Tokens>(
        "https://api.escuelajs.co/api/v1/auth/login",
        credentials
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const userReducer = userSlice.reducer;
export default userReducer;
