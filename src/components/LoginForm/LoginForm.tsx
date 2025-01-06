"use client"

import { useDispatch } from "react-redux"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"

import { login } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import CustomMUIButton from "../CustomMUIButton"
import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./LoginForm.module.scss"

import { initialFormValues } from "@/helpers/initialFormValues"
import routes from "@/helpers/routes"
import { LoginInitValues } from "@/types/initFormValuesTypes"
import { LoginSchema } from "@/yupSchemas"

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (
    values: LoginInitValues,
    { resetForm }: FormikHelpers<LoginInitValues>
  ) => {
    dispatch(login(values))
    resetForm()
  }

  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialFormValues.login}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema()}
      >
        <Form className={s.form}>
          <h2>Please Sign In</h2>
          <CustomTextField
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
          />
          <CustomTextField
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />

          <CustomMUIButton title="Submit" type="submit" variant="contained" />
          <div className={s.linkWrapper}>
            <p>
              Don&#39;t have account yet? <Link href={routes.register}>Sign Up</Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
