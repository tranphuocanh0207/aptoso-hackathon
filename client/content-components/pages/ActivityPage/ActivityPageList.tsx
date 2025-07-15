import Aptos from "data-base64:~assets/images/aptos.svg"
import React from "react"

import EmptyList from "~content-components/components/List/EmptyList"
import TokenLogo from "~content-components/components/List/TokenLogo"
import { formatNumber } from "~utils/format"
import { cn } from "~utils/lib"

const ActivityPageList = () => {
  const arr = [
    {
      fromAddress: "",
      toAddress: "",
      tokenSymbol: "APT",
      value: "0.07267",
      valueUsdt: 11
    },
    {
      fromAddress: "",
      toAddress: "",
      tokenSymbol: "APT",
      value: "0.07267",
      valueUsdt: 11
    },
    {
      fromAddress: "",
      toAddress: "",
      tokenSymbol: "APT",
      value: "0.07267",
      valueUsdt: 11
    }
  ]

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="flex flex-col gap-3 w-full">
        {arr.length > 0 ? (
          arr.map((item, index) => <ItemActivity item={item} key={index} />)
        ) : (
          <EmptyList
            title="No transactions available."
            description="You have not made any transactions as of yet."
            className="h-[155px] w-full bg-black-main rounded-3xl"
          />
        )}
      </div>
    </div>
  )
}

export default ActivityPageList

type Props = {
  item: any
}

const ItemActivity = ({ item }: Props) => {
  return (
    <div className="bg-black-main rounded-2xl py-3 px-2 flex flex-col gap-3">
      <p className="text-sm text-white">Jan 23, 2025</p>

      <div className="bg-[#F6F6F81A] rounded-[18px] p-3 flex flex-col gap-3">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-3">
            <TokenLogo src={Aptos} className="bg-black-main size-11" isSent />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Sent</span>
              <span className={cn("text-sm text-ended")}>To xeh...1PWP</span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-end justify-end">
            <span className="text-sm font-medium text-white">
              - {formatNumber(item.value)} {item.tokenSymbol}
            </span>
            <span className={"text-ended text-sm"}>
              ~${formatNumber(item.valueUsdt)}
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#FFFFFF1A]" />

        <div className="flex w-full justify-between">
          <div className="flex items-center gap-3">
            <TokenLogo src={Aptos} className="bg-black-main size-11" isSent />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Receive</span>
              <span className={cn("text-sm text-ended")}>From 9Uyt...3s6m</span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-end justify-end">
            <span className="text-sm font-medium text-live">
              + {formatNumber(item.value)} {item.tokenSymbol}
            </span>
            <span className={"text-ended text-sm"}>
              ~${formatNumber(item.valueUsdt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
