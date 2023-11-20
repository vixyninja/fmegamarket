import { RootState } from "@hooks/useRedux";

export const loadingSelector = (state: RootState) => state.loading;
