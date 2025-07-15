import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

import useGetStore from "~hooks/useGetStore"

type CustomStorageContextProps = ReturnType<typeof useGetStore>

const CustomStorageContext = createContext<
  CustomStorageContextProps | undefined
>(undefined)

type CustomStorageProviderProps = {
  children: React.ReactNode
}

export const CustomStorageProvider = ({
  children
}: CustomStorageProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false)

  const store = useGetStore()

  const currentStore = useMemo(() => {
    return store
  }, [store])

  useEffect(() => {
    const initializeStorage = () => {
      setIsInitialized(true)
    }

    initializeStorage()
  }, [])

  if (!isInitialized) return <></>

  return (
    <CustomStorageContext.Provider value={{ ...currentStore }}>
      {children}
    </CustomStorageContext.Provider>
  )
}

export const useCustomStorage = (): CustomStorageContextProps => {
  const context = useContext(CustomStorageContext)

  if (!context) {
    throw new Error(
      "useCustomStorage must be used within an CustomStorageProvider"
    )
  }

  return context
}
