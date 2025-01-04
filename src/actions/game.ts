'use server'

import { IErrorResponse } from "@/interfaces/error"
import { IGame } from "@/interfaces/game"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function startGame(country: string, mode: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    // TODO: show alert
    console.error("You are not logged in!");
    return
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/start`, {
    method: 'POST',
    body: JSON.stringify({ country, mode }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    // TODO: show alert
    const data: IErrorResponse = await response.json()
    console.error(data, "<<< error data");
    return
  }

  const data: IGame = await response.json()
  return data
}
