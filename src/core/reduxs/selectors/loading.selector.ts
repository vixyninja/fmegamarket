import { RootState } from "@/common";

export const loadingSelector = (state: RootState) => state.persisted.loading;
