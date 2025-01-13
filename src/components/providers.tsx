'use client'
import { Provider as JotaiProvider } from 'jotai'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Suspense } from 'react'

const loading = <div className="min-h-full flex justify-center items-center">Loading...</div>

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={loading}>
      <JotaiProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
          {children}
        </GoogleOAuthProvider>
      </JotaiProvider>
    </Suspense>
  )
}
