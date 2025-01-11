'use client'
import { Provider as JotaiProvider } from 'jotai'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        {children}
      </GoogleOAuthProvider>
    </JotaiProvider>
  )
}
