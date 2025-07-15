import { create } from "zustand"

import type {
  ICampaignOverview,
  IUserCampaignItem
} from "~services/campaign/types"

interface CampaignStore {
  campaigns: IUserCampaignItem[]
  setCampaigns: (campaigns: IUserCampaignItem[]) => void
  overview: ICampaignOverview
  setOverview: (overview: ICampaignOverview) => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  setCampaigns: (campaigns) => set({ campaigns }),
  overview: {
    totalCampaign: 0,
    totalReward: 0,
    totalUserJoined: 0
  },
  setOverview: (overview) => set({ overview })
}))
