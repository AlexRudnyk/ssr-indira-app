import axiosInstance from "@/api/axiosInstance"

export const getProducts = async () => {
  try {
    const { data } = await axiosInstance.get("products")
    return data
  } catch (error) {
    console.log("Error fetching products")
    return []
  }
}
