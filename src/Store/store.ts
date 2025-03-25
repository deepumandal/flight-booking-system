"use client";

import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./slices/authSlice";

// Static reducers
const staticReducers = {
  auth: authReducer,
};

// Dynamic reducers
const asyncReducers: Record<string, Reducer> = {};

const createRootReducer = () =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

const rootReducer = createRootReducer(); // ✅ Use this in type

const persistConfig = {
  key: "root",
  storage,
  // ✅ remove whitelist to persist everything or update it
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export const injectReducer = (key: string, reducer: Reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    const newRootReducer = createRootReducer();
    store.replaceReducer(persistReducer(persistConfig, newRootReducer));
  }
};

export const removeReducer = (key: string) => {
  if (asyncReducers[key]) {
    delete asyncReducers[key];
    const newRootReducer = createRootReducer();
    store.replaceReducer(persistReducer(persistConfig, newRootReducer));
  }
};

export type RootState = ReturnType<typeof rootReducer>; // ✅ Corrected
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
