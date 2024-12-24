'use server'

import { cookies } from "next/headers"

export async function markIntroShown() {
  const cookieStore = await cookies()

  cookieStore.set('introShown', 'true', {
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  })
}
