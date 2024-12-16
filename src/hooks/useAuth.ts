import { useMutation } from "@tanstack/react-query"

import { authApi } from "@/api/authApi"
import { LoginCreds } from "@/types/auth"

const useMutateAuth = () => {
  return useMutation({
    mutationFn: (creds: LoginCreds) => authApi.login(creds)
  })
}

export { useMutateAuth }
