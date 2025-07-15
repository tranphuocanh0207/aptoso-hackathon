import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

export const queryClient = new QueryClient()

const persister = createSyncStoragePersister({
  storage: window.localStorage
})

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  )
}

export default ReactQueryProvider
