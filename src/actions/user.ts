'use server'

import { IErrorResponse } from "@/interfaces/error"
import { IUser } from "@/interfaces/user"
import { cookies } from "next/headers"


export async function getProfile() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    // TODO: show alert
    console.error("You are not logged in!");
    throw new Error("You are not logged in!")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
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

  const data: IUser = await response.json()
  return data
}
