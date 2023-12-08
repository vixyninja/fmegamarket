import { RootState } from "@/common";

export const userSelector = (state: RootState) => state.persisted.user;
