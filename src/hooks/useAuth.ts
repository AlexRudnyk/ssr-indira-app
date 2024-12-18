import { useSelector } from "react-redux"

import { RootState } from "@/redux/store"

export const useAuth = () => {
  const { isLoggedIn, isLoading, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  )

  return {
    isLoggedIn,
    isLoading,
    user,
    errorMessage
  }
}
