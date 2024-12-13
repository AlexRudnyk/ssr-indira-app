import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import ProductsList from "@/components/ProductsList"

import { getProducts } from "@/utils/getProducts"

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  )
}
