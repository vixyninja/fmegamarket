import { ReduxEnum } from "@constants/redux.constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppStateType = {
  language: "vi" | "en";
  firstTime: boolean;
  loading: boolean;
};

const initialState: AppStateType = {
  language: "en",
  firstTime: true,
  loading: false,
};

const reducer = createSlice({
  name: ReduxEnum.app,
  initialState: initialState,
  reducers: {
    setLanguage: (state: AppStateType, action: PayloadAction<"vi" | "en">) => {
      state.language = action.payload;
    },
    setFirstTime: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.firstTime = action.payload;
    },
    setLoading: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const AppReducer = reducer.reducer;
export const AppAction = reducer.actions;
