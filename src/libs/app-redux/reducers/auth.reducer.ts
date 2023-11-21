import { ReduxEnum } from "@constants/redux.constant";
import { createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuth: boolean;
  accessToken: string | null;
  provider: "google" | "facebook" | "email" | null;
  idToken: string | null;
};

const initialState: AuthStateType = {
  isAuth: false,
  accessToken: null,
  provider: null,
  idToken: null,
};

const reducer = createSlice({
  name: ReduxEnum.auth,
  initialState: initialState,
  reducers: {
    signInGoogle: (state: AuthStateType) => {},
    signInGoogleSuccess: (state: AuthStateType, action) => {},
    signOutGoogle: (state: AuthStateType) => {},
    signInEmail: (state: AuthStateType) => {},
    signInEmailSuccess: (state: AuthStateType, action) => {},
    signOutEmail: (state: AuthStateType) => {},
    signInFacebook: (state: AuthStateType) => {},
    signInFacebookSuccess: (state: AuthStateType, action) => {},
    signOutFacebook: (state: AuthStateType) => {},
  },
});

export const AuthReducer = reducer.reducer;
export const AuthAction = reducer.actions;
