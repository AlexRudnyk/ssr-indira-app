import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { productsApi } from "@/api/productsApi"
import { AddProductInitValues, EditProductInitValues } from "@/types/initFormValuesTypes"

const productsKeys = {
  all: ["products"],
  getOne: (id: string) => [...productsKeys.all, id]
}

const useQueryProducts = () =>
  useQuery({
    queryKey: productsKeys.all,
    queryFn: () => productsApi.getProducts()
  })

const useQueryProduct = (id: string) =>
  useQuery({
    queryKey: productsKeys.getOne(id),
    queryFn: () => productsApi.getProductById(id)
  })

const useMutateAddProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: AddProductInitValues) => productsApi.addProduct(values),
    onSettled: () => queryClient.invalidateQueries({ queryKey: productsKeys.all })
  })
}

const useMutateEditProduct = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: EditProductInitValues) => productsApi.editProduct(id, values),
    onSettled: () => queryClient.invalidateQueries({ queryKey: productsKeys.all })
  })
}

export {
  useQueryProducts,
  useQueryProduct,
  useMutateAddProduct,
  useMutateEditProduct,
  productsKeys
}
