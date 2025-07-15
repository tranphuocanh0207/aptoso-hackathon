import axiosInstance from "~services/common"
import { ENDPOINT } from "~services/endpoint"

import type {
  ICampaignDataUpdate,
  ICampaignOverview,
  IUserCampaignItem,
  TFilterParams
} from "./types"

const get_campaign = (
  params: TFilterParams
): Promise<{
  data: {
    campaigns: IUserCampaignItem[]
    overview: ICampaignOverview
  }
}> => {
  return axiosInstance.get(ENDPOINT.campaign, { params })
}

const update_campaign = (data: ICampaignDataUpdate): Promise<any> => {
  return axiosInstance.post(ENDPOINT.update_campaign, data)
}

const claim_campaign = (campaignId: string): Promise<any> => {
  return axiosInstance.post(ENDPOINT.campaign_claim_reward, { campaignId })
}

const campaignAPI = { get_campaign, update_campaign, claim_campaign }

export { campaignAPI }
