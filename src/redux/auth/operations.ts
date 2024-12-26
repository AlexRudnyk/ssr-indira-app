import { toast } from "react-toastify"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { authApi } from "@/api/authApi"
import { cartApi } from "@/api/cartApi"
import { LoginCreds, LoginRes, RegisterCreds, User } from "@/types/auth"
import { CartItem } from "@/types/products"

export const register = createAsyncThunk<User, RegisterCreds, { rejectValue: string }>(
  "auth/register",
  async (creds, thunkAPI) => {
    try {
      const newUser = await authApi.register(creds)
      return newUser
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const login = createAsyncThunk<LoginRes, LoginCreds, { rejectValue: string }>(
  "auth/login",
  async (creds, thunkAPI) => {
    try {
      const data = await authApi.login(creds)
      return data
    } catch (error: any) {
      toast.warn(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const getCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/getCurrent",
  async (creds, thunkAPI) => {
    try {
      const data = await authApi.getCurrentUser()
      return data
    } catch (error: any) {
      toast.warn(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      authApi.logout()
    } catch (error: any) {
      toast.warn(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const addToCart = createAsyncThunk<CartItem, CartItem, { rejectValue: string }>(
  "auth/addToCart",
  async (newCartItem, thunkAPI) => {
    try {
      const data = await cartApi.addToCart(newCartItem)
      return data
    } catch (error: any) {
      toast.warn(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const decrement = createAsyncThunk<
  { data: number; id: string },
  string,
  { rejectValue: string }
>("auth/decrement", async (id, thunkAPI) => {
  try {
    const data = await cartApi.decrement(id)
    return { data, id }
  } catch (error: any) {
    toast.warn(error.response?.data?.message)
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const increment = createAsyncThunk<
  { data: number; id: string },
  string,
  { rejectValue: string }
>("auth/increment", async (id, thunkAPI) => {
  try {
    const data = await cartApi.increment(id)
    return { data, id }
  } catch (error: any) {
    toast.warn(error.response?.data?.message)
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const removeFromCart = createAsyncThunk<string, string, { rejectValue: string }>(
  "auth/removeFromCart",
  async (id, thunkAPI) => {
    try {
      const data = await cartApi.removeFromCart(id)
      return data
    } catch (error: any) {
      toast.warn(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)
