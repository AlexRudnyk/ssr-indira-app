import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  addToCart,
  decrement,
  getCurrentUser,
  increment,
  login,
  logout,
  register,
  removeFromCart
} from "./operations"

import { AuthSliceState, LoginRes, User } from "@/types/auth"
import { CartItem } from "@/types/products"

const initialState: AuthSliceState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  errorMessage: null
}

const handlePending = (state: AuthSliceState) => {
  state.isLoading = true
  state.errorMessage = null
}

const handleRejected = (state: AuthSliceState, action: PayloadAction<string | undefined>) => {
  state.isLoading = false
  state.errorMessage = action.payload ?? "An unknown error occurred"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState() {
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, state => {
        state.isLoading = false
        state.errorMessage = null
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginRes>) => {
        state.isLoggedIn = true
        state.isLoading = false
        state.errorMessage = null
        state.user = action.payload.user
      })
      .addCase(login.rejected, handleRejected)

      .addCase(getCurrentUser.pending, handlePending)
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.errorMessage = null
        state.user = action.payload
      })
      .addCase(getCurrentUser.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, state => {
        state.isLoading = false
        state.errorMessage = null
        state.isLoggedIn = false
        state.user = null
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.isLoading = false
        state.errorMessage = null
        if (state.user) state.user.productsInCart = [...state.user.productsInCart, action.payload]
      })
      .addCase(addToCart.rejected, handleRejected)

      .addCase(decrement.pending, handlePending)
      .addCase(
        decrement.fulfilled,
        (state, action: PayloadAction<{ data: number; id: string }>) => {
          state.isLoading = false
          state.errorMessage = null
          const index = state.user?.productsInCart.findIndex(
            product => product._id === action.payload.id
          )
          if (index === undefined || index < 0) return
          state.user!.productsInCart[index] = {
            ...state.user!.productsInCart[index],
            quantity: action.payload.data
          }
        }
      )
      .addCase(decrement.rejected, handleRejected)

      .addCase(increment.pending, handlePending)
      .addCase(
        increment.fulfilled,
        (state, action: PayloadAction<{ data: number; id: string }>) => {
          state.isLoading = false
          state.errorMessage = null
          const index = state.user?.productsInCart.findIndex(
            product => product._id === action.payload.id
          )
          if (index === undefined || index < 0) return
          state.user!.productsInCart[index] = {
            ...state.user!.productsInCart[index],
            quantity: action.payload.data
          }
        }
      )
      .addCase(increment.rejected, handleRejected)

      .addCase(removeFromCart.pending, handlePending)
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.errorMessage = null
        if (state.user) {
          state.user.productsInCart = state.user.productsInCart.filter(
            product => product._id !== action.payload
          )
        }
      })
      .addCase(removeFromCart.rejected, handleRejected)
  }
})

export const { clearState } = authSlice.actions

export default authSlice.reducer
