import { RootState } from "@/common";

export const alertSelector = (state: RootState) => state.persisted.alert;
