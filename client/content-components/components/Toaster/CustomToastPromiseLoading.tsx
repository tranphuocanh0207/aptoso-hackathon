import React from 'react'

import IconLoading from '~assets/icons/IconLoading'
import { cn } from '~utils/lib'

interface Props {
  title?: string
  description?: string
}

const CustomToastPromiseLoading = ({ title, description }: Props) => {
  return (
    <div
      className={cn(
        'bg-[#050318] !z-[9999999] p-2 pr-4 rounded-lg shadow-lg border border-[#C4A3FF]/30',
        '!flex items-center justify-between',
        'w-auto min-w-[225px]',
        'pointer-events-auto'
      )}
    >
      <div className="flex items-center gap-3">
        <span className="animate-spin">
          <IconLoading className="w-5" />
        </span>

        <div className="flex flex-col gap-1">
          <div className={cn('text-white text-sm font-medium')}>{title}</div>
          {description && <div className="text-white/60 text-xs font-normal">{description}</div>}
        </div>
      </div>
    </div>
  )
}

export default CustomToastPromiseLoading
