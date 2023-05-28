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
  errorMessageLogin?: string;
  errorMessageRegister?: string;
}

const initialState: UserReducer = {
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logOutUser: (state) => {
      state.currentUser = undefined;
      state.tokens = undefined;
      state.errorMessageLogin = "";
      state.errorMessageRegister = "";
    },
  },
  extraReducers: (build) => {
    build.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageRegister = action.payload.message;
      } else {
        state.currentUser = action.payload;
        state.errorMessageRegister = "";
      }
    });
    build.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageLogin = "Wrong email or password";
        state.currentUser = undefined;
      } else {
        state.tokens = action.payload;
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        state.errorMessageLogin = "";
      }
    });
    build.addCase(authenticateUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageLogin = "Cannot authenticate";
      } else {
        state.currentUser = action.payload;
        state.errorMessageLogin = "";
      }
    });
    build.addCase(refreshUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageLogin = "Session invalid";
      } else {
        state.tokens = action.payload;
        state.errorMessageLogin = "";
      }
    });
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (user: UserCreateInfo) => {
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

export const authenticateUser = createAsyncThunk(
  "authenticateUser",
  async (tokens: Tokens) => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    };
    try {
      const result = await axios.get<User>(
        "https://api.escuelajs.co/api/v1/auth/profile",
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const refreshUser = createAsyncThunk(
  "refreshUser",
  async (tokens: Tokens) => {
    const refresh = {
      refreshToken: tokens.refresh_token,
    };
    try {
      const result = await axios.post<Tokens>(
        "https://api.escuelajs.co/api/v1/auth/refresh-token",
        refresh
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const userReducer = userSlice.reducer;
export const { logOutUser } = userSlice.actions;
export default userReducer;
