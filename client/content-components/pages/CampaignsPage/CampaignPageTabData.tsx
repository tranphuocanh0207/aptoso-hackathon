import Mission from "data-base64:~assets/images/mission.png"
import moment from "moment"
import React, { useEffect, useRef } from "react"
import { useBoolean, useSetState } from "react-use"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import IconAptos from "~content-components/components/Icons/IconAptos"
import IconArrow from "~content-components/components/Icons/IconArrow"
import IconDoubleUser from "~content-components/components/Icons/IconDoubleUser"
import IconEmptyCampaign from "~content-components/components/Icons/IconEmptyCampaign"
import EmptyList from "~content-components/components/List/EmptyList"
import { bus, EVENT_BUS } from "~content-components/EventsBus"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import useCustomToaster from "~hooks/useCustomtoaster"
import { campaignAPI } from "~services/campaign"
import type { IUserCampaignItem } from "~services/campaign/types"
import type { TUser } from "~services/user/types"
import { CampaignAction } from "~types/Campaign"
import { cn, getColorStatus } from "~utils/lib"

interface Props {
  tabSelected?: any
  data: IUserCampaignItem[]
  query: any
}

const CampaignPageTabData = ({ data, query, tabSelected }: Props) => {
  const { userInfo } = useCustomStorage()
  const { notifySuccess, notifyError } = useCustomToaster()
  const [loading, setLoading] = useBoolean(false)
  const [campaignSelected, setCampaignSelected] =
    useSetState<IUserCampaignItem>()

  const claimCampaign = async (campaign: IUserCampaignItem) => {
    try {
      setCampaignSelected(campaign)
      setLoading(true)
      const res = await campaignAPI.claim_campaign(campaign.campaignId)

      if (res?.code === 200) {
        query.refetch()

        bus.emit(EVENT_BUS.CAMPAIGN_CLAIMED, {
          ...campaign,
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

      setCampaignSelected(undefined)
    } catch (error) {
      setCampaignSelected(undefined)
      setLoading(false)
      console.log("error: ", error)
      notifyError({
        title: "Claim failed!"
      })
    }
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-scroll max-h-[60vh] pb-[100px]">
      {data?.length > 0 ? (
        data?.map((item, index) => (
          <CampaignItem
            key={index}
            item={item}
            userInfo={userInfo}
            claimCampaign={claimCampaign}
            loading={loading}
            campaignSelected={campaignSelected}
            setCampaignSelected={setCampaignSelected}
            tabSelected={tabSelected}
          />
        ))
      ) : (
        <EmptyList
          icon={<IconEmptyCampaign />}
          title="No campaigns available."
          description="You have not made any transactions as of yet."
        />
      )}
    </div>
  )
}

export default CampaignPageTabData

interface IProps {
  item: IUserCampaignItem
  userInfo?: TUser
  claimCampaign?: (data: IUserCampaignItem) => void
  loading?: boolean
  campaignSelected: IUserCampaignItem
  setCampaignSelected: (data: IUserCampaignItem) => void
  tabSelected?: any
}

const CampaignItem = ({
  item,
  claimCampaign = () => {},
  campaignSelected,
  loading,
  tabSelected
}: IProps) => {
  const [isCollapse, setIsCollapse] = useBoolean(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const ended = item?.actions?.length === item?.userActions?.length

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (isCollapse) {
      requestAnimationFrame(() => {
        el.style.height = el.scrollHeight + "px"
      })
    } else {
      if (el) el.style.height = el.scrollHeight + "px"
      requestAnimationFrame(() => {
        el.style.height = "0px"
      })
    }
  }, [isCollapse])

  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white font-medium">
          {moment(item.startDate).format("MMM D")} -{" "}
          {moment(item.endDate).format("MMM D")}
        </span>
        <span
          className={cn(
            "text-sm font-medium first-letter:uppercase text-live",
            getColorStatus(ended ? "Completed" : item.status)
          )}>
          {ended ? "Completed" : item.status}
        </span>
      </div>

      <div className="bg-[#000000] p-[10px] rounded-xl flex flex-col gap-2.5 duration-200 transition-all">
        <div className=" flex items-center gap-2.5">
          <img src={Mission} alt="mission" className="size-[66px] rounded-lg" />
          <div className="flex flex-col gap-2 w-full">
            <a
              href={item?.link}
              target="_self"
              className="text-white font-medium">
              {item.title}
            </a>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-0.5">
                  <IconAptos />
                  <span className="text-main text-xs font-medium uppercase">
                    {item.rewardPerUser} APT
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <IconDoubleUser />
                  <span className="text-white text-xs font-medium uppercase">
                    {item.userJoined}
                  </span>
                </div>
              </div>
              <button
                onClick={setIsCollapse}
                className="flex items-center gap-1 cursor-pointer duration-200">
                <span
                  className={cn("text-xs text-white/60", {
                    "text-main": isCollapse
                  })}>
                  {isCollapse ? "More" : "View more"}
                </span>
                <IconArrow
                  color={isCollapse ? "#23F7DD" : "#FFFFFF99"}
                  className={cn({
                    "rotate-180": isCollapse
                  })}
                />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className="transition-all duration-300 ease-in-out overflow-hidden"
          style={{ height: 0 }}>
          <div className="flex flex-col border-t-[#FFFFFF33] border-t-[1px] mt-2.5 pt-2.5 gap-3">
            {item?.actions.map((mission, index) => (
              <div className="flex items-center justify-between w-full">
                <p className="text-xs font-medium">
                  {index + 1}.{" "}
                  {mission === CampaignAction.FOLLOW
                    ? `${mission} ${item.userName}`
                    : mission === CampaignAction.COMMENT
                      ? `${mission} "${item?.keywords}"`
                      : mission}
                </p>
                {item.userActions?.includes(mission) ? (
                  <span className="text-xs text-ended font-medium">
                    Completed
                  </span>
                ) : (
                  <ButtonLinear
                    onClick={() => {
                      if (mission === "Follow" && item.userName) {
                        window.open(`https://x.com/${item.userName}`, "_self")
                      } else {
                        if (item.link) window.open(item.link, "_self")
                      }
                    }}
                    className="!p-0 !py-[5.6px] !px-3 h-auto w-auto rounded-[100px] text-black text-xs font-medium max-h-5">
                    Start
                  </ButtonLinear>
                )}
              </div>
            ))}
          </div>
        </div>

        {item?.userActions?.length === item.actions?.length && (
          <ButtonLinear
            loading={
              loading && campaignSelected?.campaignId === item?.campaignId
            }
            onClick={() => claimCampaign(item)}
            disabled={item.userClaimed || loading}
            className="h-8 w-full text-black-main font-semibold text-sm">
            {item.userClaimed ? "Claimed" : "Claim"} {item.rewardPerUser} APT
          </ButtonLinear>
        )}
      </div>
    </div>
  )
}
