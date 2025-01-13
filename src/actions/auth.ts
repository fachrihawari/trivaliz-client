'use server'

import { IErrorResponse } from "@/interfaces/error"
import { IUser } from "@/interfaces/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  return redirect("/login")
}

type LoginResponse = {
  token: string
  user: IUser
}
type LoginForm = {
  email: string
  password: string
}
export async function login(form: LoginForm) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })

  if (!res.ok) {
    const data: IErrorResponse = await res.json()
    throw new Error(data.message)
  }

  const data: LoginResponse = await res.json()
  const cookieStore = await cookies()
  cookieStore.set("accessToken", data.token)
  return data.user
}

type RegisterForm = {
  email: string
  password: string
  username: string
  country: string
}
export async function register(form: RegisterForm) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })

  if (!res.ok) {
    const data: IErrorResponse = await res.json()
    throw new Error(data.message)
  }

  const user = await login({ email: form.email, password: form.password })
  return user
}

type GoogleLoginForm = {
  type: 'auth-code' | 'credential'
  value: string
}
export async function googleLogin(form: GoogleLoginForm) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login/google", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })

  if (!res.ok) {
    const data: IErrorResponse = await res.json()
    throw new Error(data.message)
  }

  const data: LoginResponse = await res.json()
  const cookieStore = await cookies()
  cookieStore.set("accessToken", data.token)
  return data.user
}
