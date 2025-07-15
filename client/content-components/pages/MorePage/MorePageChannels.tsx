import IconMenu from "data-base64:~assets/icons/menu.svg"
import IconNote from "data-base64:~assets/icons/note.svg"
import IconTelegram from "data-base64:~assets/icons/telegram.svg"
import IconX from "data-base64:~assets/icons/x.svg"
import React from "react"

const channels = [
  {
    key: "x",
    logo: IconX,
    href: ""
  },
  {
    key: "telegram",
    logo: IconTelegram,
    href: ""
  },
  {
    key: "note",
    logo: IconNote,
    href: ""
  },
  {
    key: "menu",
    logo: IconMenu,
    href: ""
  }
]

const MorePageChannels = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-3">
      <span className="text-sm font-medium text-ended text-center">
        Offical Channels
      </span>
      <div className="flex items-center justify-between gap-3">
        {channels.map((item) => (
          <button
            key={item.key}
            className="border-[1.5px] border-[#282828] h-[48px] px-7 py-3 rounded-[32px]">
            <img src={item.logo} alt={item.key} className="size-6" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default MorePageChannels
