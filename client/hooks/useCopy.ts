import { useCopyToClipboard } from "react-use"

import useCustomToaster from "./useCustomtoaster"

const useCopy = () => {
  const { notifySuccess } = useCustomToaster()
  const [_, copy] = useCopyToClipboard()
  return (value: string) => {
    copy(value)
    notifySuccess({
      title: "Copy success!"
    })
  }
}

export default useCopy
