"use client"

import { useQuery } from "@tanstack/react-query"
import { Field, Form, Formik } from "formik"
import Image from "next/image"

import axiosInstance from "@/api/axiosInstance"
import { getProducts } from "@/utils/getProducts"

type InitValues = {
  email: string
  password: string
}

const LoginForm = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts()
  })

  const initialValues: InitValues = {
    email: "",
    password: ""
  }

  const handleSubmit = (values: InitValues) => {
    try {
      axiosInstance.post("/auth/login", values, {
        withCredentials: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  console.log("PRODUCTS", products)

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="email" placeholder="Enter your email" />
          <Field name="password" placeholder="Enter your password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {isPending ? (
        "Loading..."
      ) : (
        <ul>
          {products.map((product: { _id: string; title: string; photoURL: string }) => (
            <li key={product._id}>
              <p>{product.title}</p>
              <Image src={product.photoURL} alt="product" width={300} height={300} />
            </li>
          ))}
        </ul>
      )}
      {/* <button
        type="button"
        onClick={async () => {
          try {
            const products = await axiosInstance.get("products")
            console.log("PRODUCTS", products)
          } catch (error) {
            console.log(error)
          }
        }}
      >
        Click
      </button> */}
    </>
  )
}

export default LoginForm
