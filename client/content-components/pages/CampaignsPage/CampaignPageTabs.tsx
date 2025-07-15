import React, { useEffect, useMemo, useState } from "react"

import { campaignQuery } from "~query/campaigns"
import { useCampaignStore } from "~stores/campaign"
import type { CampaignItem } from "~types/Campaign"
import { cn } from "~utils/lib"

import CampaignPageTabData from "./CampaignPageTabData"

type TabItem = {
  key: string
  title: string
  textColor: string
}

const tabs: TabItem[] = [
  {
    key: "all",
    title: "All",
    textColor: "text-white"
  },
  {
    key: "ongoing",
    title: "Live",
    textColor: "text-live"
  },
  {
    key: "pending",
    title: "Pending",
    textColor: "text-pending"
  },
  {
    key: "ended",
    title: "Completed",
    textColor: "text-ended"
  }
]

const CampaignPageTabs = () => {
  const { campaigns, query } = campaignQuery({
    page: 0,
    limit: 50
  })
  const [tabSeletecd, setTabSelected] = useState<TabItem>(tabs[0])

  const filteredData = useMemo(() => {
    return tabSeletecd.key === "all"
      ? campaigns
      : tabSeletecd?.title === "Completed"
        ? campaigns?.filter(
            (f) => f?.actions?.length === f?.userActions?.length
          )
        : tabSeletecd?.title === "Pending"
          ? campaigns?.filter(
              (f) =>
                f?.actions?.length > f?.userActions?.length &&
                f?.status === "Pending"
            )
          : campaigns.filter((item) => item.status === tabSeletecd.title)
  }, [tabSeletecd, campaigns])

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h4 className="text-base font-semibold text-white">
        Total Campaigns: {campaigns.length}
      </h4>

      <div className="flex items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTabSelected(tab)}
            className={cn(
              "py-[5.6px] px-3 rounded-[100px] border-[1px] border-[#87878733] duration-200 cursor-pointer",
              tab.textColor,
              {
                "border-[#23F7DD]": tab.key === tabSeletecd.key
              }
            )}>
            {tab.title}
          </button>
        ))}
      </div>

      <CampaignPageTabData
        tabSelected={tabSeletecd}
        data={filteredData}
        query={query}
      />
    </div>
  )
}

export default CampaignPageTabs
