// app/providers.tsx
'use client' // Required for context providers

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, set a staleTime above 0 to avoid 
        // refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This prevents re-creating the client if React suspends during initial render
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function QueryProviders({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState for initializing the query client if you are 
  // using prefetching or advanced SSR patterns to avoid bugs.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
