import { RootState } from "@hooks/useRedux";

export const loadingSelector = (state: RootState) => state.persisted.loading;
