import { Metadata } from "next"

import AuthWrapper from "@/components/AuthWrapper"
import LoginForm from "@/components/LoginForm/LoginForm"

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login Page of Indira Shop"
}

export default function Login() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  )
}
