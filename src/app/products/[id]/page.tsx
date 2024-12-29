import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import ProductPage from "@/components/ProductPage"

import { commentsApi } from "@/api/commentsApi"
import { productsApi } from "@/api/productsApi"
import { commentsKeys } from "@/hooks/useQueryComments"
import { productsKeys } from "@/hooks/useQueryProducts"

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

  await queryClient.prefetchQuery({
    queryKey: commentsKeys.all,
    queryFn: () => commentsApi.getComments(id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage id={id} />
    </HydrationBoundary>
  )
}
