import { combineReducers, configureStore } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import createSagaMiddleware from "redux-saga";
import { AppReducer } from "./reducers";
import rootSaga from "./sagas/root.saga";
import { ReduxEnum } from "@constants/redux.constant";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: EncryptedStorage,
  timeout: 30000,
  stateReconciler: autoMergeLevel2,
  whitelist: [ReduxEnum.app],
};

const rootReducers = combineReducers({
  app: AppReducer,
});

type RootState = ReturnType<typeof rootReducers>;
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
const createDebugger = require("redux-flipper").default;

const middlewares = [sagaMiddleware, createDebugger()];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
