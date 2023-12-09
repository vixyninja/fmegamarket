import { STORE_ENUM } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  provider: "google" | "facebook" | "email" | null;
  idToken: string | null;
  isRememberMe: boolean;
};

const initialState: AuthStateType = {
  isAuth: false,
  refreshToken: null,
  accessToken: null,
  provider: null,
  idToken: null,
  isRememberMe: false,
};

const reducer = createSlice({
  name: STORE_ENUM.AUTH,
  initialState: initialState,
  reducers: {
    setCredentials: (state: AuthStateType, action: PayloadAction<Partial<AuthStateType>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearCredentials: (state: AuthStateType) => {
      Object.assign(state, {
        isAuth: false,
        refreshToken: null,
        accessToken: null,
        provider: null,
        idToken: null,
        isRememberMe: false,
      });
    },
  },
});

export const AuthReducer = reducer.reducer;
export const AuthAction = reducer.actions;
