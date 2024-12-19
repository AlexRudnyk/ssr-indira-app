"use client"

import { Button } from "@mui/material"
import { Form, Formik, FormikHelpers } from "formik"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./AddProductForm.module.scss"

import { initialFormValues } from "@/helpers/initialFormValues"
import { AddProductInitValues } from "@/types/initFormValuesTypes"

const AddProductForm = () => {
  const handleSubmit = (
    values: AddProductInitValues,
    { resetForm }: FormikHelpers<AddProductInitValues>
  ) => {
    console.log("VALUES", values)
    resetForm()
  }

  return (
    <Formik
      initialValues={initialFormValues.addProduct}
      onSubmit={handleSubmit}
      //   validationSchema={{}}
    >
      <Form className={s.form}>
        <h2>Please Add a Product</h2>
        <CustomTextField name="title" id="outlined-basic" label="Title" variant="outlined" />
        <CustomTextField name="text" id="outlined-basic" label="Text" variant="outlined" />
        <CustomTextField
          name="description"
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
        <CustomTextField
          name="price"
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          InputProps={{
            inputProps: { style: { appearance: "none", MozAppearance: "textfield" } }
          }}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Form>
    </Formik>
  )
}

export default AddProductForm
