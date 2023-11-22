import { ReduxEnum } from "@constants/redux.constant";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  AlertReducer,
  AppReducer,
  AuthReducer,
  LoadingReducer,
} from "../reducers";
import { apiService } from "../services";
const createDebugger = require("redux-flipper").default;
import logger from "redux-logger";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: EncryptedStorage,
  timeout: 30000,
  stateReconciler: autoMergeLevel2,
  blacklist: [ReduxEnum.loading],
};

const rootReducers = combineReducers({
  [ReduxEnum.app]: AppReducer,
  [ReduxEnum.loading]: LoadingReducer,
  [ReduxEnum.alert]: AlertReducer,
  [ReduxEnum.auth]: AuthReducer,
});

type RootState = ReturnType<typeof rootReducers>;
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducers);

const middlewares: any[] = [createDebugger(), apiService.middleware, logger];

export const store = configureStore({
  reducer: {
    [ReduxEnum.persisted]: persistedReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);
