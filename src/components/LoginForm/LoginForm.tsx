"use client"

import { Field, Form, Formik } from "formik"
import Cookies from "js-cookie"

import axiosInstance from "@/api/axiosInstance"
import { useGlobalContext } from "@/context/store"
import { storageKeys } from "@/helpers/storageKeys"

type InitValues = {
  email: string
  password: string
}

const LoginForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext()

  const initialValues: InitValues = {
    email: "",
    password: ""
  }

  const handleSubmit = async (values: InitValues) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", values)
      Cookies.set(storageKeys.access_token, data.accessToken, {
        sameSite: "Strict"
      })
      setIsLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("ISLOGGEDIN", isLoggedIn)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field name="email" placeholder="Enter your email" />
        <Field name="password" placeholder="Enter your password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default LoginForm
