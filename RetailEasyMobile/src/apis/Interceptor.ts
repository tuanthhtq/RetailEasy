import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  }
})

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data)
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }
    return Promise.reject(err.message);
  }
);

export const Interceptor = <T = any>(config: AxiosRequestConfig) => instance.request<any, T>(config);

