import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from "axios"

import { Storage } from "@plasmohq/storage"

import { STORAGE_KEY } from "~utils/keys"
import { isErrorResponse } from "~utils/typeguard"

import { ENDPOINT } from "./endpoint"

const storage = new Storage()

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.PLASMO_PUBLIC_API_URL
})

let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (err: unknown) => void
}[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token as string)
    }
  })

  failedQueue = []
}

// Request interceptor: gắn token
const onRequest = async (config: InternalAxiosRequestConfig) => {
  const token = await storage.get(STORAGE_KEY.accessToken)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

// Response interceptor: xử lý response thành công
const onResponse = (response: AxiosResponse): any => {
  return response.data
}

// Response interceptor: xử lý lỗi
const onResponseError = async (error: AxiosError): Promise<any> => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean
  }

  const errorData: any = error?.response?.data
  // Nếu lỗi 401 và chưa retry
  const isRefresh =
    (errorData?.code === 401 || errorData?.status === 401) &&
    !originalRequest._retry

  console.log("error.response", error.response, isRefresh)
  if (isRefresh) {
    originalRequest._retry = true

    if (isRefreshing) {
      // Nếu đang trong quá trình refresh token => chờ
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return axiosInstance(originalRequest)
        })
        .catch((err) => Promise.reject(err))
    }

    isRefreshing = true

    try {
      const refreshToken = await storage.get(STORAGE_KEY.refreshToken)
      const response = await axiosInstance.get(
        `${ENDPOINT.refresh_token}/${refreshToken}`
      )

      console.log("response", response)

      const newAccessToken = response.data.accessToken
      const newRefreshToken = response.data.refreshToken

      storage.setItem(STORAGE_KEY.accessToken, newAccessToken)
      storage.setItem(STORAGE_KEY.refreshToken, newRefreshToken)

      processQueue(null, newAccessToken)

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      }

      return axiosInstance(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)

      storage.remove(STORAGE_KEY.accessToken)
      storage.remove(STORAGE_KEY.refreshToken)

      localStorage.removeItem(STORAGE_KEY.accessToken)
      localStorage.removeItem(STORAGE_KEY.refreshToken)
      // Optional: redirect to login page
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }

  // Các lỗi khác (ví dụ 400, 403, 500,...)
  const status = error?.response?.status || errorData?.code

  if (status === 400 || status === 403 || status === 500) {
    const err = error.response?.data
    if (isErrorResponse(err)) {
      // xử lý theo custom
    }
  }

  let res: unknown
  if (error.response && typeof error.response.data === "object") {
    res = {
      ...error.response.data,
      status: error.response.status
    }
  }

  return Promise.reject(res ?? error.response)
}

// Gắn interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance
