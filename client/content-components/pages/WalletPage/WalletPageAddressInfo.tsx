import IconDeposit from "data-base64:~assets/icons/deposit.svg"
import IconSend from "data-base64:~assets/icons/send.svg"
import IconStake from "data-base64:~assets/icons/stake.svg"
import IconSwap from "data-base64:~assets/icons/swap.svg"
import BgWallet from "data-base64:~assets/images/bg_wallet.png"
import React from "react"

import IconAptos from "~content-components/components/Icons/IconAptos"
import IconCopy from "~content-components/components/Icons/IconCopy"
import IconRefresh from "~content-components/components/Icons/IconRefresh"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import router from "~content-components/routes"
import { ERoute } from "~content-components/routes/routes"
import useCopy from "~hooks/useCopy"
import { useTokenStore } from "~stores/token"
import { formatNumber, shortenString } from "~utils/format"
import { cn, getFullPathname } from "~utils/lib"

const actions = [
  {
    title: "Send",
    icon: IconSend,
    href: ERoute.Withdraw
  },
  {
    title: "Receive",
    icon: IconDeposit,
    href: ERoute.Deposit
  },
  {
    title: "Swap",
    icon: IconSwap,
    href: ""
  },
  {
    title: "Stake",
    icon: IconStake,
    href: ""
  }
]

interface Props {
  refetch?: () => void
  loading?: boolean
}

const WalletPageAddressInfo = ({
  refetch = () => {},
  loading = false
}: Props) => {
  const { userInfo } = useCustomStorage()
  const totalBalance = useTokenStore((s) => s.total)
  const copy = useCopy()

  return (
    <div className="p-2 rounded-3xl bg-black-main w-full">
      <div
        style={{
          backgroundImage: `url(${BgWallet})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="bg-wallet flex flex-col rounded-[20px] p-3 w-full gap-6">
        <div className="bg-[#191919] w-full flex justify-center items-center px-1.5 py-2.5 gap-1 rounded-[25px]">
          <IconAptos />
          <div className="h-[15px] w-[1px] bg-white/60"></div>
          <button
            onClick={() => copy(userInfo?.wallet?.address)}
            className="flex items-center gap-1">
            <p>{shortenString(userInfo?.wallet?.address)}</p>
            <IconCopy />
          </button>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex flex-row gap-[8.8px]">
            <span className="text-white text-sm">Total Balance</span>
            <IconRefresh
              className={cn("duration-1000 cursor-pointer scale-110", {
                "animate-spin": loading
              })}
              onClick={() => {
                if (!loading) refetch()
              }}
            />
          </div>

          <h1 className="bg-text-linear bg-clip-text text-transparent font-semibold text-[25.6px]">
            ${formatNumber(totalBalance || 0)}
          </h1>
        </div>

        <div className="flex justify-between items-center">
          {actions.map((item) => (
            <button
              key={item.title}
              onClick={() => {
                if (item.href)
                  router.navigate(`..${getFullPathname(item.href)}`)
              }}
              className=" flex flex-col justify-center items-center cursor-pointer duration-200 gap-2 hover:opacity-80">
              <div className="flex flex-col justify-center items-center rounded-[29.33px] size-[44px] border-[1px] border-[#23F7DD33] ">
                <img src={item.icon} className="size-6" alt="icon" />
              </div>
              <span className="text-xs text-white">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletPageAddressInfo
