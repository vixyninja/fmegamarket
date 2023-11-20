import { ReduxEnum } from "@constants/redux.constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type LoadingStateType = {
  loading: boolean;
  title?: string;
};

const initialState: LoadingStateType = {
  loading: false,
  title: "",
};

const reducer = createSlice({
  name: ReduxEnum.app,
  initialState: initialState,
  reducers: {
    showLoading: (state: LoadingStateType) => {
      state.loading = true;
      state.title = "";
    },
    hideLoading: (state: LoadingStateType) => {
      state.loading = false;
      state.title = "";
    },
    showLoadingWithTitle: (
      state: LoadingStateType,
      action: PayloadAction<string>,
    ) => {
      state.loading = true;
      state.title = action.payload;
    },
  },
});

export const LoadingReducer = reducer.reducer;
export const LoadingAction = reducer.actions;
