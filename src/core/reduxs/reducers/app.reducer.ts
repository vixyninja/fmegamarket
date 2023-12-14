import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STORE_ENUM } from "@/common";

type AppStateType = {
  language: "vi" | "en";
  firstTime: boolean;
  fontFamily: "roboto" | "poppins";
};

const initialState: AppStateType = {
  language: "en",
  firstTime: false,
  fontFamily: "roboto",
};

const reducer = createSlice({
  name: STORE_ENUM.APP,
  initialState: initialState,
  reducers: {
    setLanguage: (state: AppStateType, action: PayloadAction<"vi" | "en">) => {
      state.language = action.payload;
    },
    setFirstTime: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.firstTime = action.payload;
    },
    setFontFamily: (
      state: AppStateType,
      action: PayloadAction<"roboto" | "poppins">,
    ) => {
      state.fontFamily = action.payload;
    },
  },
});

export const AppReducer = reducer.reducer;
export const AppAction = reducer.actions;
