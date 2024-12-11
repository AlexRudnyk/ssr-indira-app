"use client";

import { Field, Form, Formik } from "formik";

import axiosInstance from "@/api/axiosInstance";

type InitValues = {
  email: string;
  password: string;
};

export default function Login() {
  const initialValues: InitValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: InitValues) => {
    try {
      axiosInstance.post("/auth/login", values, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="email" placeholder="Enter your email" />
          <Field name="password" placeholder="Enter your password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <button
        type="button"
        onClick={async () => {
          try {
            const products = await axiosInstance.get("products");
            console.log("PRODUCTS", products);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Click
      </button>
    </>
  );
}
