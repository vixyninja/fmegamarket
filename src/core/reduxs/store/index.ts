import { STORE_ENUM } from "@/common";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { AlertReducer, AppReducer, AuthReducer, LoadingReducer } from "../reducers";
import { apiService } from "../services/api.service";

const createDebugger = require("redux-flipper").default;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: EncryptedStorage,
  timeout: 30000,
  stateReconciler: autoMergeLevel2,
  blacklist: [STORE_ENUM.LOADING, STORE_ENUM.ALERT, STORE_ENUM.PERSISTED, apiService.reducerPath],
  whitelist: [STORE_ENUM.APP, STORE_ENUM.AUTH],
};

const rootReducers = combineReducers({
  [STORE_ENUM.APP]: AppReducer,
  [STORE_ENUM.LOADING]: LoadingReducer,
  [STORE_ENUM.ALERT]: AlertReducer,
  [STORE_ENUM.AUTH]: AuthReducer,
});

type RootState = ReturnType<typeof rootReducers>;
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducers);

const middlewares: any[] = [createDebugger(), apiService.middleware];

export const store = configureStore({
  reducer: {
    [STORE_ENUM.PERSISTED]: persistedReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);
