import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import ProductsList from "@/components/ProductsList"

import { productsApi } from "@/api/productsApi"
import { productsKeys } from "@/hooks/useProducts"

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: productsKeys.all,
    queryFn: productsApi.getProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  )
}
