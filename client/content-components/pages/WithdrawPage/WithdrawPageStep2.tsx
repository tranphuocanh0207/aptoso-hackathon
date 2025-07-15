import React from "react"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import IconAptos from "~content-components/components/Icons/IconAptos"
import { cn } from "~utils/lib"

interface Props {
  onNextStep: () => void
}

const WithdrawPageStep2 = ({ onNextStep = () => {} }: Props) => {
  return (
    <div className="mt-9 flex flex-col h-full">
      <div className="flex flex-col justify-center items-center gap-2.5">
        <p className="text-sm text-ended">You are sending</p>
        <h4 className="text-[40px] font-medium text-white">$100</h4>
        <div className="flex items-center gap-1">
          <IconAptos />
          <p className="text-base font-medium">124,0157 APT</p>
        </div>
      </div>
      <div className="border-t-[1px] border-t-[#FFFFFF33] mt-4 pt-6">
        <div className="flex items-center w-full gap-4">
          <div className="flex flex-col w-full justify-between items-center gap-2">
            <p className="text-sm text-ended text-center">From</p>
            <div className="border-[#272930] border-[1px] rounded-[100px] p-2 h-10 w-full flex items-center gap-2.5 bg-black-main">
              <IconAptos />
              <p className="text-white font-medium text-sm">0x123456...1234</p>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-center gap-2">
            <p className="text-sm text-ended text-center">To</p>
            <div className="border-[#272930] border-[1px] rounded-[100px] p-2 h-10 w-full flex items-center gap-2.5 bg-black-main">
              <IconAptos />
              <p className="text-white font-medium text-sm">0x123456...1234</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-ended">Network:</span>
            <span className="text-sm font-medium text-white">Aptos</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-ended">Network fee:</span>
            <div className="flex flex-col items-end justify-end">
              <span className="text-sm font-medium text-white">~$0.02</span>
              <span className="text-sm font-medium text-ended">0.000 APT</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-ended">Send time:</span>
            <span className="text-sm font-medium text-white">
              EST. less than 10 minutes
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-ended">Toal:</span>
            <span className="text-xl font-semibold text-main">$99.84</span>
          </div>
        </div>
      </div>
      <div className="flex h-full justify-end items-end">
        <ButtonLinear
          onClick={onNextStep}
          className={cn(
            "h-[50px] rounded-2xl text-black-main w-full font-bold"
          )}>
          SEND NOW
        </ButtonLinear>
      </div>
    </div>
  )
}

export default WithdrawPageStep2
