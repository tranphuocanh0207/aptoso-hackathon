import toast, { type ToastOptions } from "react-hot-toast"

import CustomToast, {
  type CustomToastProps
} from "~content-components/components/Toaster/CustomToast"

type NotifyInput = Pick<CustomToastProps, "title" | "description"> & {
  options?: ToastOptions
  cb?: () => Promise<any>
}

function useCustomToaster() {
  // NOTE: find way to merge into 1 func, eg: toast[type]
  const notifySuccess = ({ title, description, options }: NotifyInput) => {
    toast.success((t) => {
      return (
        <CustomToast
          t={t}
          title={title}
          description={description}
          onClose={() => toast.remove(t.id)}
        />
      )
    }, options)
  }

  const notifyError = ({ title, description, options }: NotifyInput) => {
    toast.error((t) => {
      return (
        <CustomToast
          t={t}
          title={title}
          description={description}
          onClose={() => toast.remove(t.id)}
        />
      )
    }, options)
  }

  const notifyLoading = ({ title, description, options }: NotifyInput) => {
    toast.loading((t) => {
      return (
        <CustomToast
          t={t}
          title={title}
          description={description}
          onClose={() => toast.remove(t.id)}
        />
      )
    }, options)
  }

  return { notifySuccess, notifyError, notifyLoading, toast }
}

export default useCustomToaster
