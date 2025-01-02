import { Metadata } from "next"

import AuthWrapper from "@/components/AuthWrapper"
import RegisterForm from "@/components/RegisterForm"

export const metadata: Metadata = {
  title: "Register Page",
  description: "Register Page of Indira Shop"
}

export default function Register() {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  )
}
