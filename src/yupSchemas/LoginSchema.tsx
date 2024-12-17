import { object, string } from "yup"

import { regexps } from "./regexps"

export const LoginSchema = () => {
  return object({
    email: string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(regexps.email, "Invalid email address"),
    password: string()
      .required("Password is required")
      .matches(
        regexps.password,
        "Password should be from 8 till 64 symbols and contain at least 1 uppercase letter, 1 number and 1 special symbol from !@#$%^&*"
      )
  })
}

export default LoginSchema
