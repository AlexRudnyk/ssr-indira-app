import { useMutation } from "@tanstack/react-query"

import { authApi } from "@/api/authApi"
import { LoginCreds, RegisterCreds } from "@/types/auth"

const useMutateRegister = () => {
  return useMutation({
    mutationFn: (creds: RegisterCreds) => authApi.register(creds)
  })
}

const useMutateLogin = () => {
  return useMutation({
    mutationFn: (creds: LoginCreds) => authApi.login(creds)
  })
}

export { useMutateRegister, useMutateLogin }
