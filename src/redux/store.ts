import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"

import authReducer from "../redux/auth/authSlice"

import { checkTokenExpiryMiddleware } from "./middlewares/checkTokenExpiry"

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem(value: any) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local")

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["isLoggedIn", "user"]
}

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(checkTokenExpiryMiddleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
