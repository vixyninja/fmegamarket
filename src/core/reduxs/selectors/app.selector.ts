import { RootState } from "@/common";

export const appSelector = (state: RootState) => state.persisted.app;
