import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"

import ProductsList from "@/components/ProductsList"

import { productsApi } from "@/api/productsApi"

export const metadata: Metadata = {
  title: "Indira Shop",
  description: "Indira - the place, where you can find hygiene products"
}

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: productsApi.getProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  )
}
