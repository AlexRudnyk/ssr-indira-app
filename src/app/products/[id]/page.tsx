import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import ProductPage from "@/components/ProductPage"

import { productsApi } from "@/api/productsApi"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Product({ params }: Props) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["products", id],
    queryFn: () => productsApi.getProductById(id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage id={id} />
    </HydrationBoundary>
  )
}
