'use server'

import { IErrorResponse } from "@/interfaces/error"
import { IGame } from "@/interfaces/game"
import { cookies } from "next/headers"

export async function startGame(country: string, mode: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    // TODO: show alert
    console.error("You are not logged in!");
    throw new Error("You are not logged in!")
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
    throw new Error(data.message)
  }

  const data: IGame = await response.json()
  return data
}

export async function getGame(id: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    // TODO: show alert
    console.error("You are not logged in!");
    throw new Error("You are not logged in!")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    // TODO: show alert
    const data: IErrorResponse = await response.json()
    console.error(data, "<<< error data");
    throw new Error(data.message)
  }

  const data: IGame = await response.json()
  return data
}
