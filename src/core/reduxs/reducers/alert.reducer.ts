import { STORE_ENUM } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertStateType = {
  type: "success" | "error" | "warning" | "info" | "core";
  title: string;
  message: string;
  callback: () => void;
  cancel: () => void;
  isShow: boolean;
};

const initialState: AlertStateType = {
  type: "success",
  title: "Notification",
  message: "Notification message",
  callback: () => {},
  cancel: () => {},
  isShow: false,
};

const reducer = createSlice({
  name: STORE_ENUM.ALERT,
  initialState,
  reducers: {
    showAlert: (
      state: AlertStateType,
      action: PayloadAction<Partial<AlertStateType>>,
    ) => {
      state.type = action.payload.type || "core";
      state.title = action.payload.title || "Notification";
      state.message = action.payload.message || "Notification message";
      state.callback = action.payload.callback || (() => {});
      state.cancel = action.payload.cancel || (() => {});
      state.isShow = true;
    },
    hideAlert: (state: AlertStateType) => {
      state.isShow = false;
    },
    disposeAlert: (state: AlertStateType) => {
      state.type = "success";
      state.title = "Notification";
      state.message = "Notification message";
      state.callback = () => {};
      state.cancel = () => {};
      state.isShow = false;
    },
  },
});

export const AlertReducer = reducer.reducer;
export const AlertAction = reducer.actions;
