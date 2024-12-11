import { storageKeys } from "@/helpers/storageKeys";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = Cookies.get(storageKeys.access_token);

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const expiryDate = decoded.exp && decoded.exp * 1000;
    const isExpired = expiryDate && Date.now() > expiryDate;

    if (isExpired) {
      request.headers.Authorization = undefined;
      Cookies.remove(storageKeys.access_token);
      console.log("TOKEN EXPIRED");
      return Promise.reject(new Error("Token expired"));
    }

    request.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : undefined;
  }

  return request;
});

export default axiosInstance;
