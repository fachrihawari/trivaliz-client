'use server'

import { IErrorResponse } from "@/interfaces/error"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginResponse = {
  token: string
  user: {
    id: string
    username: string
    email: string
    country: string
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  return redirect("/login")
}

export async function login(formData: FormData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const data: IErrorResponse = await res.json()
    // TODO: Show error UI
    return redirect("/login?type=error&message=" + data.message)
  }
  const data: LoginResponse = await res.json()
  const cookieStore = await cookies()
  cookieStore.set("accessToken", data.token)

  return redirect("/")
}
