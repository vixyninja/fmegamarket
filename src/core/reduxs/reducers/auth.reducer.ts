import { STORE_ENUM } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  provider: "google" | "facebook" | "email" | null;
  idToken: string | null;
  isRememberMe: boolean;
  [key: string]: any;
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
    signInEmail: (state: AuthStateType) => {},
    signOut: (state: AuthStateType) => {},
    setCredentials: (state: AuthStateType, action: PayloadAction<Partial<AuthStateType>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearCredentials: (state: AuthStateType) => {
      Object.assign(state, initialState);
    },
  },
});

export const AuthReducer = reducer.reducer;
export const AuthAction = reducer.actions;
