import React, { useState } from "react"

import HeaderCustom from "~content-components/components/Header/HeaderCustom"

import PrivateKeyPageStep1 from "./PrivateKeyPageStep1"
import PrivateKeyPageStep2 from "./PrivateKeyPageStep2"

const SecurityAndPrivacyPage = () => {
  const [step, setStep] = useState<number>(1) // 1, 2

  return (
    <div className="flex flex-col px-4 gap-4 h-full">
      <HeaderCustom
        title="Private Key"
        isZoom={false}
        className="px-0 h-auto"
      />
      {step === 1 && (
        <PrivateKeyPageStep1 step={step} onNextSTep={() => setStep(2)} />
      )}
      {step === 2 && <PrivateKeyPageStep2 />}
    </div>
  )
}

export default SecurityAndPrivacyPage
