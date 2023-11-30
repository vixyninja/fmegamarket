import { RootState } from "@/common";

export const authSelector = (state: RootState) => state.persisted.auth;
