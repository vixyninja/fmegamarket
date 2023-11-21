import { RootState } from "@hooks/useRedux";

export const appSelector = (state: RootState) => state.persisted.app;
