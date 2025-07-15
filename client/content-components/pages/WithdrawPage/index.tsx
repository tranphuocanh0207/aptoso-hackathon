import React, { useState } from "react"

import HeaderCustom from "~content-components/components/Header/HeaderCustom"

import WithdrawPageStep1 from "./WithdrawPageStep1"
import WithdrawPageStep2 from "./WithdrawPageStep2"
import WithdrawPageStep3 from "./WithdrawPageStep3"
import WithdrawPageSteps from "./WithdrawPageSteps"

const WithdrawPage = () => {
  const [step, setStep] = useState<number>(1)

  return (
    <div className="flex flex-col px-4 gap-4 h-full">
      <HeaderCustom title="Receive" isZoom={false} className="px-0 h-auto" />
      <div className="flex flex-col mt-2 h-full pb-[59px]">
        <WithdrawPageSteps step={step} />
        {step === 1 && <WithdrawPageStep1 onNextStep={() => setStep(2)} />}
        {step === 2 && <WithdrawPageStep2 onNextStep={() => setStep(3)} />}
        {step === 3 && <WithdrawPageStep3 />}
      </div>
    </div>
  )
}

export default WithdrawPage
