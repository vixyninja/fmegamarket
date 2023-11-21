import { combineReducers, configureStore } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { AlertReducer, AppReducer, LoadingReducer } from "./reducers";
import { ReduxEnum } from "@constants/redux.constant";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: EncryptedStorage,
  timeout: 30000,
  stateReconciler: autoMergeLevel2,
  blacklist: [ReduxEnum.loading],
};

const rootReducers = combineReducers({
  app: AppReducer,
  loading: LoadingReducer,
  alert: AlertReducer,
});

type RootState = ReturnType<typeof rootReducers>;
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducers);

const createDebugger = require("redux-flipper").default;

const middlewares = [createDebugger()];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export const persistor = persistStore(store);
