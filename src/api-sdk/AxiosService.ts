import Axios, { type AxiosRequestConfig } from "axios";
import { AnyType } from "@AppTypes/AnyType";
import { Toaster } from "@Components/ui/Toaster";

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL, //getOrThrowEnv("NEXT_PUBLIC_APP_BASE_URL"),
  withCredentials: true,
});

export const request = async <T>(
  options?: AxiosRequestConfig,
  config?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = await axiosInstance({
    ...options,
    ...config,
    cancelToken: source.token,
  });

  return promise.data;
};

axiosInstance.interceptors.response.use(
  (response: AnyType) => response,
  (error: AnyType) => {
    if (error) {
      const { data } = error.response;

      Toaster({
        type: "error",
        message: data.message,
      });
    }
    const customError = new Error(error.message);
    return Promise.reject(customError);
  }
);
