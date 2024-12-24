import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { addToCart, getCurrentUser, login, logout, register } from "./operations"

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
  }
})

export const { clearState } = authSlice.actions

export default authSlice.reducer
