import Aptos from "data-base64:~assets/images/aptos.svg"
import React, { useEffect } from "react"

import IconArrow from "~content-components/components/Icons/IconArrow"
import TokenLogo from "~content-components/components/List/TokenLogo"
import axios from "~node_modules/axios"
import { useSetState } from "~node_modules/react-use/lib"
import { userWalletQuery } from "~query/user"
import type { IUserBalance } from "~services/user/types"
import { useTokenStore } from "~stores/token"
import { formatNumber } from "~utils/format"

interface Props {
  tokens: IUserBalance[]
}

const WalletPageTokens = ({ tokens = [] }: Props) => {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex  items-center gap-2">
          <TokenLogo src={Aptos} className="size-8 bg-white/10" />
          <span className="text-sm font-medium">APTOS</span>
        </div>

        <button className=" rounded-[25px] px-3 py-2.5 flex items-center gap-2 border-[1px] border-[#F6F6F833]">
          <span className="text-sm font-medium">Sort by</span>
          <IconArrow color="#8B98A5" className="rotate-180" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {tokens.map((item, index) => {
          // const sign = item.percent < 0 ? "" : "+"
          return <Token key={index} index={index} item={item} />
        })}
      </div>
    </div>
  )
}

export default WalletPageTokens

interface ITokenProps {
  item: any
  index: number
}

const Token = ({ item, index }: ITokenProps) => {
  const [dataDex, setDataDex] = useSetState<any>()
  const amount = item.rawAmount / 10 ** item.decimals
  const addResolvedToken = useTokenStore((s) => s.addResolvedToken)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `https://api.dexscreener.com/tokens/v1/aptos/${item.address}`
        )
        const dataS = data?.data[0]

        const amount = item.rawAmount / 10 ** item.decimals
        const value = Number(amount) * Number(dataS?.priceUsd)
        addResolvedToken({
          symbol: item?.symbol,
          value
        })
        setDataDex(dataS)
      } catch (error) {}
    }

    let interval: any

    interval = setInterval(() => {
      fetchData()
    }, 10000)

    fetchData()
    return () => {
      clearInterval(interval)
    }
  }, [item])

  return (
    <div
      key={index}
      className="flex items-center justify-between w-full bg-[#F6F6F80D] p-3 rounded-[18px]">
      <div className="flex items-center gap-2">
        <TokenLogo
          src={
            item?.symbol === "APT" ? Aptos : dataDex?.info?.imageUrl || Aptos
          }
          className="bg-black-main size-16"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{item?.name}</span>
          {/* <span
        className={cn("text-sm text-live",
           {
          "text-red": item.percent < 0
        }
        )}>
        {sign}
        {item.percent}%
      </span> */}
        </div>
      </div>

      <div className="flex flex-col gap-0.5 items-end justify-end">
        <span className="text-sm font-medium text-white">
          {formatNumber(item?.rawAmount / 10 ** item.decimals)} {item?.symbol}
        </span>
        <span className={"text-ended text-sm"}>
          ~${formatNumber(amount * Number(dataDex?.priceUsd))}
        </span>
      </div>
    </div>
  )
}
