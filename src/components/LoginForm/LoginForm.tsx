"use client"

import Button from "@mui/material/Button"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./LoginForm.module.scss"

import { useGlobalContext } from "@/context/store"
import { initialFormValues } from "@/helpers/initialFormValues"
// import { LoginSchema } from "../LoginSchema"
import routes from "@/helpers/routes"
import { useMutateLogin } from "@/hooks/useAuth"
import { LoginInitValues } from "@/types/initFormValuesTypes"

const LoginForm = () => {
  const loginMutation = useMutateLogin()
  const { setIsLoggedIn } = useGlobalContext()

  const handleSubmit = async (
    values: LoginInitValues,
    { resetForm }: FormikHelpers<LoginInitValues>
  ) => {
    await loginMutation.mutateAsync(values)
    setIsLoggedIn(true)
    resetForm()
  }

  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialFormValues.login}
        onSubmit={handleSubmit}
        // validationSchema={LoginSchema()}
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

          <Button variant="contained" type="submit">
            Submit
          </Button>
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
