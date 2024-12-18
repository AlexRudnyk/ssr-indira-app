"use client"

import { useState } from "react"
import { Alert, Snackbar } from "@mui/material"
import Button from "@mui/material/Button"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./LoginForm.module.scss"

import { useGlobalContext } from "@/context/store"
import { initialFormValues } from "@/helpers/initialFormValues"
import routes from "@/helpers/routes"
import { useMutateLogin } from "@/hooks/useAuth"
import { LoginInitValues } from "@/types/initFormValuesTypes"
import { LoginSchema } from "@/yupSchemas"

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSnackOpened, setIsSnackOpened] = useState<boolean>(false)
  const loginMutation = useMutateLogin()
  const { setIsLoggedIn } = useGlobalContext()

  const handleSubmit = async (
    values: LoginInitValues,
    { resetForm }: FormikHelpers<LoginInitValues>
  ) => {
    try {
      setIsSnackOpened(false)
      setErrorMessage(null)
      await loginMutation.mutateAsync(values)
      setIsLoggedIn(true)
      resetForm()
    } catch (error: any) {
      setIsSnackOpened(true)
      setErrorMessage(error.response?.data?.message)
    }
  }

  return (
    <>
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
      {errorMessage && (
        <Snackbar
          open={isSnackOpened}
          autoHideDuration={3000}
          onClose={() => setIsSnackOpened(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}
    </>
  )
}

export default LoginForm
