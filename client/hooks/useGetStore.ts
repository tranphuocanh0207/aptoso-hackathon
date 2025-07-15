import { useStorage } from "@plasmohq/storage/hook"

import type { TUser } from "~services/user/types"
import { STORAGE_KEY } from "~utils/keys"

const useGetStore = () => {
  const [openSidebar, setOpenSidebar] = useStorage<boolean>(
    STORAGE_KEY.openSidebar,
    false
  )
  const [password, setPassword] = useStorage<string>(STORAGE_KEY.password, "")
  const [oldPassword, setOldPassword] = useStorage<string>(
    STORAGE_KEY.oldPassword,
    ""
  )

  const [accessToken, setAccessToken] = useStorage<string>(
    STORAGE_KEY.accessToken,
    ""
  )
  const [refreshToken, setRefreshToken] = useStorage<string>(
    STORAGE_KEY.refreshToken,
    ""
  )
  const [userInfo, setUserInfo] = useStorage<TUser>(
    STORAGE_KEY.userInfo,
    {} as TUser
  )

  return {
    openSidebar,
    setOpenSidebar,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    userInfo,
    setUserInfo,
    password,
    setPassword,
    oldPassword,
    setOldPassword
  }
}

export default useGetStore
