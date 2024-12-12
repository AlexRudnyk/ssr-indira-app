import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import LoginForm from "@/components/LoginForm/LoginForm"

import { getProducts } from "@/utils/getProducts"

export default async function Login() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LoginForm />
    </HydrationBoundary>
  )
}
