import AptosoICon from "data-base64:~assets/logo-show.png"
import React from "react"
import { QRCode } from "react-qrcode-logo"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import HeaderCustom from "~content-components/components/Header/HeaderCustom"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import useCopy from "~hooks/useCopy"
import { shortenString } from "~utils/format"

const DepositPage = () => {
  const { userInfo } = useCustomStorage()
  const copy = useCopy()

  return (
    <div className="flex flex-col px-4 gap-4 h-full">
      <HeaderCustom title="Receive" isZoom={false} className="px-0 h-auto" />
      <div className="flex flex-col h-full justify-between pb-[59px]">
        <div className="px-10">
          <div className="bg-black-main p-2 rounded-3xl flex flex-col gap-3">
            <div className="bg-[#191919] p-6 rounded-[20px]">
              <QRCode
                value={userInfo?.wallet?.address}
                size={220}
                logoImage={AptosoICon}
                logoHeight={80}
                logoWidth={80}
              />
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-sm font-medium">Address</span>
              <span className="text-white/60">
                {shortenString(userInfo?.wallet?.address)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 justify-center items-center">
          <p className="text-sm font-medium max-w-[330px] text-center">
            Only send APT Network tokens (SPL) to this address
          </p>
          <ButtonLinear
            onClick={() => copy(userInfo?.wallet?.address)}
            className="h-[50px] rounded-2xl text-sm font-bold text-[#14121A]">
            COPY
          </ButtonLinear>
        </div>
      </div>
    </div>
  )
}

export default DepositPage
