import IconKey from "data-base64:~assets/icons/key.svg"
import React from "react"

import IconMoney from "~content-components/components/Icons/IconMoney"
import IconUsers from "~content-components/components/Icons/IconUsers"
import { useCampaignStore } from "~stores/campaign"
import { formatNumber } from "~utils/format"

const CampaignPageTotalInfo = () => {
  const overview = useCampaignStore((s) => s.overview)

  return (
    <div className="flex flex-col">
      <div className="bg-[#000000] rounded-3xl p-2 flex flex-col gap-5 pb-4">
        <div className="bg-border-navigator p-[1.5px] rounded-[20px] overflow-hidden">
          <div className="flex items-center p-3 bg-[#191919] gap-3">
            <img src={IconKey} alt="icon" className="size-[52px]" />
            <div className="flex flex-col gap-2 items-start">
              <p className="text-xs text-white/70">Available Campaigns</p>
              <span className="text-2xl font-semibold text-white">
                {formatNumber(overview.totalCampaign)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="w-full flex flex-col gap-1.5">
            <span className="text-white/70 text-xs">Total Rewards</span>
            <div className="flex items-center gap-1.5">
              <IconMoney />
              <span className="text-lg font-semibold text-white">
                {formatNumber(overview.totalReward)} APT
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <span className="text-white/70 text-xs">Users on Missions</span>
            <div className="flex items-center gap-1.5">
              <IconUsers />
              <span className="text-lg font-semibold text-white">
                {overview.totalUserJoined}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignPageTotalInfo
