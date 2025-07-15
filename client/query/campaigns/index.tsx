import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

import { campaignAPI } from "~services/campaign"
import type {
  ICampaignDataUpdate,
  TFilterParams
} from "~services/campaign/types"
import { useCampaignStore } from "~stores/campaign"
import { campaignKeys } from "~utils/keys"

const campaignQuery = (params: TFilterParams) => {
  const campaigns = useCampaignStore((s) => s.campaigns)
  const setCampaigns = useCampaignStore((s) => s.setCampaigns)
  const setOverview = useCampaignStore((s) => s.setOverview)

  const query = useQuery({
    queryFn: () => campaignAPI.get_campaign(params),
    queryKey: campaignKeys.get_campaign(params),
    enabled: true
  })

  const queryData = useMemo(
    () => query?.data?.data?.campaigns || [],
    [query?.data]
  )

  const overview = useMemo(() => query?.data?.data?.overview, [query?.data])

  useEffect(() => {
    if (queryData && overview) {
      setCampaigns(queryData)
      setOverview(overview)
    }
  }, [queryData, overview])

  return {
    query,
    queryData,
    campaigns,
    setCampaigns
  }
}

const campaignMutation = () => {
  const updateCampaign = useMutation({
    mutationFn: (data: ICampaignDataUpdate) =>
      campaignAPI.update_campaign(data),
    onSuccess: async (res, payload) => {
      console.log("update success", res)
    },
    onError: () => {}
  })

  return {
    updateCampaign
  }
}

export { campaignQuery, campaignMutation }
