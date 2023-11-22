import { RootState } from "@hooks/useRedux";

export const authSelector = (state: RootState) => state.persisted.auth;
