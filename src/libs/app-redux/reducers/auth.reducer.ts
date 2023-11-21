import { ReduxEnum } from "@constants/redux.constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  provider: "google" | "facebook" | "email" | null;
  idToken: string | null;
};

const initialState: AuthStateType = {
  isAuth: false,
  refreshToken: null,
  accessToken: null,
  provider: null,
  idToken: null,
};

const reducer = createSlice({
  name: ReduxEnum.auth,
  initialState: initialState,
  reducers: {
    signInGoogle: (state: AuthStateType) => {},
    signOutGoogle: (state: AuthStateType) => {},
    signInEmail: (state: AuthStateType) => {},
    signOutEmail: (state: AuthStateType) => {},
    signInFacebook: (state: AuthStateType) => {},
    signOutFacebook: (state: AuthStateType) => {},
    setCredentials: (
      state: AuthStateType,
      action: PayloadAction<Partial<AuthStateType>>,
    ) => {
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
