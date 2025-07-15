import XLinear from "data-base64:~assets/icons/x_linear.svg"
import Avatar from "data-base64:~assets/images/avatar.png"
import React from "react"

import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"

const MorePageAccountInfo = () => {
  const { userInfo } = useCustomStorage()
  return (
    <div className="flex justify-between items-center w-full p-4">
      <div className="flex items-center gap-2">
        <img src={XLinear} className="size-5" alt="x-linear" />
        <span className="text-sm text-white font-medium">Acount</span>
      </div>
      <div className="flex items-center gap-2">
        <img
          src={userInfo?.avatar || Avatar}
          className="size-6 rounded-full"
          alt="avatar"
        />
        <span className="text-sm text-white font-medium">
          @{userInfo?.username}
        </span>
      </div>
    </div>
  )
}

export default MorePageAccountInfo
