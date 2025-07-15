import axiosInstance from "~services/common"
import { ENDPOINT } from "~services/endpoint"

import type { IUserBalance, TUser } from "./types"

const user_profile = (
  accessToken: string
): Promise<{
  data: TUser
}> => {
  return axiosInstance.get(ENDPOINT.user_profile, {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
}

const user_profile_with_username = (
  username: string
): Promise<{
  data: TUser
}> => {
  return axiosInstance.get(`${ENDPOINT.user_profile_with_username}/${username}`)
}

const user_tokens = (): Promise<{
  data: {
    balances: IUserBalance[]
  }
}> => {
  return axiosInstance.get(ENDPOINT.user_wallet_tokens)
}
const userAPI = { user_profile, user_profile_with_username, user_tokens }

export { userAPI }
