"use client"

import { FC, SetStateAction } from "react"
import { Button } from "@mui/material"
import { Form, Formik } from "formik"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./OrderModal.module.scss"

import { initialFormValues } from "@/helpers/initialFormValues"
import { MakeOrderSchema } from "@/yupSchemas"

type Props = {
  onOrderSubmit: ({
    name,
    phone,
    email
  }: {
    name: string
    phone: string
    email: string
  }) => Promise<void>
  setIsOrderModalOpen: (value: SetStateAction<boolean>) => void
}

const OrderModal: FC<Props> = ({ onOrderSubmit }) => {
  const handleSubmit = (values: { name: string; phone: string; email: string }) => {
    onOrderSubmit(values)
  }

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialFormValues.makeOrder}
        onSubmit={handleSubmit}
        validationSchema={MakeOrderSchema()}
      >
        <Form className={s.form}>
          <h2>Please fill order form</h2>
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

          <Button variant="contained" type="submit">
            Order
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default OrderModal
