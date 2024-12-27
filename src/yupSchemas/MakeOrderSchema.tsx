import { object, string } from "yup"

import { regexps } from "./regexps"

export const MakeOrderSchema = () => {
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
      .matches(regexps.email, "Invalid email address")
  })
}
