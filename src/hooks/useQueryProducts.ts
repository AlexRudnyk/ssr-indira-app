import { useQuery } from "@tanstack/react-query"

import { productsApi } from "@/api/productsApi"

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

export { useQueryProducts, useQueryProduct, productsKeys }
