import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import { userAPI } from "~services/user"
import { useTokenStore } from "~stores/token"
import { userKeys } from "~utils/keys"

const userQuery = () => {
  const { setUserInfo, userInfo } = useCustomStorage()
  const getUserProfile = useMutation({
    mutationFn: (accessToken?: string) =>
      accessToken ? userAPI.user_profile(accessToken) : undefined,
    onSuccess: async (res) => {
      if (res.data) {
        setUserInfo(res.data)
      }
    },
    onError: () => {}
  })

  const getUserProfileWithUsername = useMutation({
    mutationFn: (username?: string) =>
      userAPI.user_profile_with_username(username),
    onSuccess: async (res) => {
      if (res.data) {
        setUserInfo({
          ...userInfo,
          ...res.data
        })
      }
    },
    onError: () => {}
  })

  return { getUserProfile, getUserProfileWithUsername }
}

const userWalletQuery = () => {
  const query = useQuery({
    queryFn: () => userAPI.user_tokens(),
    queryKey: userKeys.user_wallet_tokens(),
    enabled: true
  })

  const queryData = useMemo(
    () => query?.data?.data?.balances || [],
    [query?.data]
  )
  const reset = useTokenStore((s) => s.reset)
  const setTargetCount = useTokenStore((s) => s.setTargetCount)

  useEffect(() => {
    reset()
    setTargetCount(queryData.length)
  }, [queryData])

  return {
    tokens: queryData,
    query,
    loading: query.isFetching
  }
}

export { userQuery, userWalletQuery }
