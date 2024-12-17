"use client"

import { Button } from "@mui/material"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./RegisterForm.module.scss"

import { initialFormValues } from "@/helpers/initialFormValues"
import routes from "@/helpers/routes"
import { useMutateRegister } from "@/hooks/useAuth"
import { RegisterInitValues } from "@/types/initFormValuesTypes"

const RegisterForm = () => {
  const registerMutation = useMutateRegister()
  const { push } = useRouter()

  const handleSubmit = async (
    values: RegisterInitValues,
    { resetForm }: FormikHelpers<RegisterInitValues>
  ) => {
    try {
      await registerMutation.mutateAsync(values)
      resetForm()
      push("/login")
    } catch (error: any) {
      if (error.response?.status === 409) {
        console.log("Conflict Error: Phone number or email already exists.")
      } else {
        console.log("An unexpected error occurred:", error.message)
      }
    }
  }

  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialFormValues.register}
        onSubmit={handleSubmit}
        // validationSchema={LoginSchema()}
      >
        <Form className={s.form}>
          <h2>Please Sign Up</h2>
          <CustomTextField name="name" id="outlined-basic" label="Name" variant="outlined" />
          <CustomTextField
            name="phone"
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            placeholder="+380671112233"
          />
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
              Already have account? <Link href={routes.login}>Sign In</Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterForm
