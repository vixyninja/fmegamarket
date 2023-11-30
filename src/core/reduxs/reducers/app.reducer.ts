import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxEnum } from "../enum";

type AppStateType = {
  language: "vi" | "en";
  firstTime: boolean;
};

const initialState: AppStateType = {
  language: "en",
  firstTime: true,
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
  },
});

export const AppReducer = reducer.reducer;
export const AppAction = reducer.actions;
