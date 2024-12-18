import { createAsyncThunk } from "@reduxjs/toolkit"

import { authApi } from "@/api/authApi"
import { LoginCreds, LoginRes, RegisterCreds, User } from "@/types/auth"

export const register = createAsyncThunk<User, RegisterCreds, { rejectValue: string }>(
  "auth/register",
  async (creds, thunkAPI) => {
    try {
      const newUser = await authApi.register(creds)
      return newUser
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
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
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)
