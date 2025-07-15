import React from "react"

import CampaignPageTabs from "./CampaignPageTabs"
import CampaignPageTotalInfo from "./CampaignPageTotalInfo"

const CampaignsPage = () => {
  return (
    <div className="flex flex-col h-full px-4">
      <CampaignPageTotalInfo />
      <CampaignPageTabs />
    </div>
  )
}

export default CampaignsPage
