import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Configuration object for Redux-persist
const persistConfig = {
  key: "root", // Key under which the persisted state will be stored
  storage, // Storage engine to persist the state (e.g., localStorage)
  version: 1, // Version number of the persisted state
};

// Create a persisted reducer by wrapping the authReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create a Redux store using the persistedReducer
const store = configureStore({
  reducer: persistedReducer, // Set persistedReducer as the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore specific actions that are dispatched internally by Redux-persist
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
