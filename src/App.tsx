import React from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

export const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </div>
  )
}
