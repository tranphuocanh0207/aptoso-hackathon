import React, { useEffect } from "react"

import router from "~content-components/routes"
import { ERoute } from "~content-components/routes/routes"
import { userQuery } from "~query/user"
import type { TUser } from "~services/user/types"

import { useCustomStorage } from "./CustomStorageProvider"

type AuthType = {
  userInfo?: TUser
  logout: () => void
}
const AuthContext = React.createContext<AuthType | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    userInfo,
    password,
    setUserInfo,
    setAccessToken,
    setRefreshToken,
    setPassword,
    accessToken
  } = useCustomStorage()
  const { getUserProfile, getUserProfileWithUsername } = userQuery()

  const logout = () => {
    setUserInfo({} as TUser)
    setAccessToken("")
    setRefreshToken("")
    setPassword("")
  }

  useEffect(() => {
    if (accessToken) getUserProfile.mutate(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (userInfo?.userId) {
      if (password) {
        // Nếu đã có userId và password => vào campaigns
        router.navigate(`/${ERoute.Campaigns}`, { replace: true })
      } else {
        // Nếu có userId nhưng chưa có password => vào secure password
        router.navigate(`/${ERoute.SecurePassword}`, { replace: true })
      }
    } else {
      // Chưa có userId => vào sign in
      router.navigate(`/${ERoute.SignIn}`, { replace: true })
    }
  }, [userInfo, password])

  useEffect(() => {
    if (userInfo?.username) {
      getUserProfileWithUsername.mutate(userInfo.username)
    }
  }, [userInfo?.username])

  return (
    <AuthContext.Provider
      value={{
        logout,
        userInfo
      }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

export { AuthProvider, useAuth }
