import React from "react"

import MorePageAccountInfo from "./MorePageAccountInfo"
import MorePageChannels from "./MorePageChannels"
import MorePageMenu from "./MorePageMenu"

const MorePage = () => {
  return (
    <div className="flex flex-col h-full w-full px-4">
      <MorePageAccountInfo />
      <MorePageMenu />
      <MorePageChannels />
    </div>
  )
}

export default MorePage
