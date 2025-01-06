"use client"

import { useDispatch } from "react-redux"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { register } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import CustomMUIButton from "../CustomMUIButton"
import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./RegisterForm.module.scss"

import { initialFormValues } from "@/helpers/initialFormValues"
import routes from "@/helpers/routes"
import { RegisterInitValues } from "@/types/initFormValuesTypes"
import { RegisterSchema } from "@/yupSchemas"

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { push } = useRouter()

  const handleSubmit = async (
    values: RegisterInitValues,
    { resetForm, setFieldError }: FormikHelpers<RegisterInitValues>
  ) => {
    try {
      await dispatch(register(values))
      resetForm()
      push("/login")
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorText = error.response?.data?.message?.toLowerCase()
        if (errorText.includes("phone")) {
          setFieldError("phone", "This phone number is already registered.")
        } else if (errorText.includes("email")) {
          setFieldError("email", "This email is already registered.")
        } else {
          console.log("Conflict Error: Unknown conflict")
        }
      }
    }
  }

  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialFormValues.register}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema()}
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

          <CustomMUIButton title="Submit" type="submit" variant="contained" />
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
