import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { commentsApi } from "@/api/commentsApi"

const commentsKeys = {
  allOfProduct: (productId: string) => ["comments", productId]
}

const useQueryComments = (productId: string) =>
  useQuery({
    queryKey: commentsKeys.allOfProduct(productId),
    queryFn: () => commentsApi.getComments(productId)
  })

// const useQueryProduct = (id: string) =>
//   useQuery({
//     queryKey: productsKeys.getOne(id),
//     queryFn: () => productsApi.getProductById(id)
//   })

const useMutateAddComment = (productId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: { text: string }) => commentsApi.addComment({ productId, values }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: commentsKeys.allOfProduct(productId) })
  })
}

// const useMutateEditProduct = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ id, values }: EditProductBody) => productsApi.editProduct({ id, values }),
//     onSettled: () => queryClient.invalidateQueries({ queryKey: productsKeys.all })
//   })
// }

// const useMutateDeleteProduct = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (id: string) => productsApi.deleteProduct(id),
//     onSettled: () => queryClient.invalidateQueries({ queryKey: productsKeys.all })
//   })
// }

export {
  //   useQueryProducts,
  //   useQueryProduct,
  //   useMutateAddProduct,
  //   useMutateEditProduct,
  //   useMutateDeleteProduct,
  useQueryComments,
  useMutateAddComment,
  commentsKeys
}
