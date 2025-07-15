import React, { useEffect } from "react"
import { useBoolean, useSetState } from "react-use"

import { bus, EVENT_BUS } from "~content-components/EventsBus"
import useCustomToaster from "~hooks/useCustomtoaster"
import { campaignAPI } from "~services/campaign"
import type { IUserCampaignItem } from "~services/campaign/types"
import { useCampaignStore } from "~stores/campaign"
import { CampaignAction } from "~types/Campaign"
import { cn } from "~utils/lib"

import ButtonLinear from "../Buttons/ButtonLinear"
import IconAptos from "../Icons/IconAptos"
import IconMoney from "../Icons/IconMoney"
import IconSafe from "../Icons/IconSafe"
import IconUsers from "../Icons/IconUsers"

interface Props {
  data: IUserCampaignItem
}

const DetectX = ({ data }: Props) => {
  const campaigns = useCampaignStore((state) => state.campaigns)
  const [dataS, setData] = useSetState(
    data ? campaigns?.find((f) => f?.campaignId === data?.campaignId) : data
  )
  const { notifySuccess, notifyError } = useCustomToaster()
  const [loading, setLoading] = useBoolean(false)

  const claimCampaign = async () => {
    try {
      setLoading(true)
      const res = await campaignAPI.claim_campaign(dataS?.campaignId)

      if (res?.code === 200) {
        setData({
          userClaimed: true
        })
        bus.emit(EVENT_BUS.CAMPAIGN_DATA_UPDATE, {
          ...dataS,
          userClaimed: true
        })

        notifySuccess({
          title: (
            <div className="flex flex-col gap-1">
              <p>Claim successfully!</p>
              <a
                target="_blank"
                href={`https://explorer.aptoslabs.com/txn/${res?.data?.transactionHash}?network=mainnet`}
                className="text-blue-500 duration-200 hover:underline hover:underline-offset-1 font-bold text-xs flex flex-row gap-1 items-center">
                <span>View on block explorer</span>
              </a>
            </div>
          )
        })
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("error: ", error)
      notifyError({
        title: "Claim failed!"
      })
    }
  }

  const updateCampaign = async (
    campaignId: string,
    action: "Follow" | "Like" | "Comment" | "Retweet"
  ) => {
    try {
      const completedAction = [...dataS.userActions, action]
      const completedAt =
        completedAction.length >= dataS?.actions?.length ? Date.now() : null

      const res = await campaignAPI.update_campaign({
        campaignId: campaignId,
        completedAction,
        completedAt
      })

      if (res?.code === 200) {
        setData({
          userActions: completedAction,
          completedAt
        })

        bus.emit(EVENT_BUS.CAMPAIGN_DATA_UPDATE, {
          ...dataS,
          userActions: completedAction,
          completedAt
        })

        notifySuccess({
          title: `${action} successfully!`
        })
      }
    } catch (error) {
      console.log("updateCampaign error: ", error)
      notifyError({
        title: `${action} failed!`
      })
    }
  }

  useEffect(() => {
    const getCampaignClaimed = (dataP: any) => {
      if (dataP) {
        setData((prev) => ({
          ...prev,
          userClaimed:
            dataP?.campaignId === prev?.campaignId && dataP?.userClaimed
              ? true
              : prev?.userClaimed
        }))
      }
    }

    bus.on(EVENT_BUS.CAMPAIGN_CLAIMED, getCampaignClaimed)
    return () => {
      bus.off(EVENT_BUS.CAMPAIGN_CLAIMED, getCampaignClaimed)
    }
  }, [])

  useEffect(() => {
    let called: boolean = false

    const getLike = (data: any) => {
      if (
        data &&
        dataS?.campaignId &&
        dataS?.actions?.includes(CampaignAction.LIKE)
      ) {
        if (
          data?.isLike &&
          !dataS?.userActions?.includes(CampaignAction.LIKE) &&
          dataS?.title === data?.title
        ) {
          if (!called) {
            called = true
            updateCampaign(dataS?.campaignId, CampaignAction.LIKE)
          }
        }
      }
    }

    bus.on(EVENT_BUS.LIKE, getLike)
    return () => {
      bus.off(EVENT_BUS.LIKE, getLike)
    }
  }, [dataS])

  useEffect(() => {
    let called: boolean = false

    const getComment = (data: any) => {
      if (
        data &&
        dataS?.campaignId &&
        dataS?.actions?.includes(CampaignAction.COMMENT)
      ) {
        if (
          data?.isComment &&
          !dataS?.userActions?.includes(CampaignAction.COMMENT) &&
          data?.commentText?.toLowerCase() ===
            dataS?.keywords?.trim().toLowerCase()
        ) {
          if (!called) {
            called = true
            updateCampaign(dataS?.campaignId, CampaignAction.COMMENT)
          }
        }
      }
    }

    bus.on(EVENT_BUS.COMMENT, getComment)
    return () => {
      bus.off(EVENT_BUS.COMMENT, getComment)
    }
  }, [dataS])

  useEffect(() => {
    let called: boolean = false
    const getFollow = (data: any) => {
      if (
        data &&
        dataS?.campaignId &&
        dataS?.actions?.includes(CampaignAction.FOLLOW)
      ) {
        const username = dataS?.userName?.includes("@")
          ? dataS?.userName
          : `@${dataS?.userName}`
        if (
          data?.isFollow &&
          !dataS?.userActions?.includes(CampaignAction.FOLLOW) &&
          data?.username === username
        ) {
          if (!called) {
            called = true
            updateCampaign(dataS?.campaignId, CampaignAction.FOLLOW)
          }
        }
      }
    }

    bus.on(EVENT_BUS.FOLLOW, getFollow)
    return () => {
      bus.off(EVENT_BUS.FOLLOW, getFollow)
    }
  }, [dataS])

  useEffect(() => {
    let called: boolean = false
    const getRetweet = (data: any) => {
      if (
        data &&
        dataS?.campaignId &&
        dataS?.actions?.includes(CampaignAction.RETWEET)
      ) {
        if (
          data?.isRetweet &&
          !dataS?.userActions?.includes(CampaignAction.RETWEET) &&
          data?.title === dataS?.title
        ) {
          if (!called) {
            called = true
            updateCampaign(dataS?.campaignId, CampaignAction.RETWEET)
          }
        }
      }
    }

    bus.on(EVENT_BUS.RETWEET, getRetweet)
    return () => {
      bus.off(EVENT_BUS.RETWEET, getRetweet)
    }
  }, [dataS])

  return (
    <div className="bg-linear-main pb-[3px] w-[100%] my-4 rounded-[20px] shadow-custom overflow-hidden">
      <div className="bg-[#171717] p-2 pb-0 w-full flex flex-col gap-3">
        <div className="flex flex-col bg-black-main p-3 rounded-2xl gap-3">
          <div className="flex items-center justify-between w-full">
            <span
              id="aptoso-title"
              className="text-sm font-medium text-white text-start">
              {data?.title}
            </span>

            {dataS?.userActions?.length < dataS?.actions?.length ? (
              <div className="flex items-center justify-end gap-1">
                {IconInfo}
                <span className="text-xs text-[#23B7F7]">Pending task</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 min-w-[150px] justify-end">
                <div className="flex items-center gap-1">
                  <IconAptos />
                  <span className="text-main text-xs font-medium">
                    {dataS?.rewardPerUser} APT
                  </span>
                </div>
                <ButtonLinear
                  loading={loading}
                  disabled={dataS?.userClaimed}
                  onClick={claimCampaign}
                  classNameLoading="size-4"
                  className={cn("h-6 text-xs font-medium w-auto text-black")}>
                  {dataS?.userClaimed ? "Claimed" : "Claim"}
                </ButtonLinear>
                {/* {IconCheck}
                <span className="text-xs text-white">Mark as Done</span> */}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {dataS.actions.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className={cn("size-3 rounded border-[1px] border-white", {
                    "bg-main border-main": dataS?.userActions?.includes(item)
                  })}
                />
                <span
                  onClick={() => {
                    if (item === "Follow" && dataS.userName) {
                      window.open(`https://x.com/${dataS.userName}`, "_self")
                    } else {
                      if (dataS.link) window.open(dataS.link, "_self")
                    }
                  }}
                  className="text-xs font-medium text-white cursor-pointer duration-200 hover:opacity-95">
                  {item === CampaignAction.FOLLOW
                    ? `${item} ${dataS.userName}`
                    : item === CampaignAction.COMMENT
                      ? `${item} "${dataS?.keywords}"`
                      : item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-3 pb-3">
          <div className="flex flex-col w-full gap-2">
            <span className="text-xs text-[#FFFFFFAB]">
              Rewards Distributed
            </span>
            <div className="flex-row flex gap-2 items-center">
              <IconMoney />
              <p className="text-sm text-white font-medium">
                {dataS.totalTokenReward}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <span className="text-xs text-[#FFFFFFAB]">Users Joined</span>
            <div className="flex-row flex gap-2 items-center">
              <IconUsers />
              <p className="text-sm text-white font-medium">
                {dataS?.userJoined} participants
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <span className="text-xs text-[#FFFFFFAB]">Reward Left</span>
            <div className="flex-row flex gap-2 items-center">
              <IconSafe />
              <p className="text-sm text-white font-medium">
                ${dataS?.rewardLeft} remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetectX

const IconCheck = (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.75 9.24967L5.42157 12.1663L12.25 2.83301"
      stroke="white"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconInfo = (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6663 8.49967C14.6663 4.81778 11.6816 1.83301 7.99967 1.83301C4.31778 1.83301 1.33301 4.81778 1.33301 8.49967C1.33301 12.1816 4.31778 15.1663 7.99967 15.1663C11.6816 15.1663 14.6663 12.1816 14.6663 8.49967ZM7.99967 4.66634C8.27582 4.66634 8.49967 4.8902 8.49967 5.16634V9.16634C8.49967 9.44248 8.27582 9.66634 7.99967 9.66634C7.72353 9.66634 7.49967 9.44248 7.49967 9.16634V5.16634C7.49967 4.8902 7.72353 4.66634 7.99967 4.66634ZM7.99967 11.833C8.36786 11.833 8.66634 11.5345 8.66634 11.1663C8.66634 10.7982 8.36786 10.4997 7.99967 10.4997C7.63148 10.4997 7.33301 10.7982 7.33301 11.1663C7.33301 11.5345 7.63148 11.833 7.99967 11.833Z"
      fill="#23B7F7"
    />
  </svg>
)
