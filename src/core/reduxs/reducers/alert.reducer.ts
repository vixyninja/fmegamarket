import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxEnum } from "../store";

type AlertStateType = {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  callback: () => void;
  cancel: () => void;
  isShow: boolean;
};

const initialState: AlertStateType = {
  type: "success",
  title: "Notification",
  message: "Do you want to continue?",
  callback: () => {},
  cancel: () => {},
  isShow: false,
};

const reducer = createSlice({
  name: ReduxEnum.alert,
  initialState,
  reducers: {
    setAlert: (
      state: AlertStateType,
      action: PayloadAction<Partial<AlertStateType>>,
    ) => {
      Object.assign(state, action.payload);
    },
    showAlert: (state: AlertStateType) => {
      state.isShow = true;
    },
    hideAlert: (state: AlertStateType) => {
      state.isShow = false;
    },
    disposeAlert: (state: AlertStateType) => {
      Object.assign(state, initialState);
    },
  },
});

export const AlertReducer = reducer.reducer;
export const AlertAction = reducer.actions;
