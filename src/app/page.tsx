"use client";

import axios from "axios";
import { Field, Form, Formik } from "formik";

type InitValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export default function Home() {
  const initialValues: InitValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values: InitValues) => {
    try {
      axios.post("http://localhost:3001/api/auth/register", values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field name="name" placeholder="Enter your name" />
        <Field name="phone" placeholder="Enter your phone" />
        <Field name="email" placeholder="Enter your email" />
        <Field name="password" placeholder="Enter your password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
