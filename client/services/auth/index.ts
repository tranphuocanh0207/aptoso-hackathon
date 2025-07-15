import axiosInstance from "~services/common"
import { ENDPOINT } from "~services/endpoint"

const login_twitter = (): Promise<any> => {
  return axiosInstance.get(ENDPOINT.login_twitter)
}

const login_twitter_callback = (payload: any): Promise<unknown> => {
  return axiosInstance.post(ENDPOINT.login_twitter_callback, payload)
}

const authAPI = { login_twitter, login_twitter_callback }

export { authAPI }
