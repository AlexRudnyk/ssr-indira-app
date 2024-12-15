import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import ProductPage from "@/components/ProductPage"

import { productsApi } from "@/api/productsApi"
import { productsKeys } from "@/hooks/useProducts"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Product({ params }: Props) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: productsKeys.getOne(id),
    queryFn: () => productsApi.getProductById(id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage id={id} />
    </HydrationBoundary>
  )
}
