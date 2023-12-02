import { STORE_ENUM } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  name: STORE_ENUM.ALERT,
  initialState,
  reducers: {
    showAlert: (
      state: AlertStateType,
      action: PayloadAction<Partial<AlertStateType>>,
    ) => {
      state.type = action.payload.type || "success";
      state.title = action.payload.title || "Notification";
      state.message = action.payload.message || "Do you want to continue?";
      state.callback = action.payload.callback || (() => {});
      state.cancel = action.payload.cancel || (() => {});
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
