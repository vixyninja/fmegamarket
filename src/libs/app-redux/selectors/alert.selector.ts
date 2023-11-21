import { RootState } from "@hooks/useRedux";

export const alertSelector = (state: RootState) => state.persisted.alert;
