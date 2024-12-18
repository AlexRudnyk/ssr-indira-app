import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import ProductsList from "@/components/ProductsList"

import { productsApi } from "@/api/productsApi"

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
