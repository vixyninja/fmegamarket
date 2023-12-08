import { STORE_ENUM } from "@/common";
import { IUser } from "@/core/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserStateType = {
  user: IUser | null;
};

const initialState: UserStateType = {
  user: null,
};

const reducer = createSlice({
  name: STORE_ENUM.USER,
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => ({
      ...state,
      user: action.payload,
    }),
    clearUser: (state) => {
      Object.assign(state, {
        user: null,
      });
    },
  },
});

export const UserReducer = reducer.reducer;
export const UserAction = reducer.actions;
