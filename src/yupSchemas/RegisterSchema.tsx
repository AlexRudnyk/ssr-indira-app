import { object, string } from "yup"

import { regexps } from "./regexps"

export const RegisterSchema = () => {
  return object({
    name: string()
      .trim()
      .required("Name is required")
      .matches(regexps.name, "Only latinic letters are allowed from 2 till 25 characters"),

    phone: string()
      .trim()
      .required("Phone is required")
      .matches(regexps.phone, "invalid phone number format"),

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
