import Button from "@/components/button"
import Input from "@/components/input"
import { ErrorResponse } from "@/interfaces/error"
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

export default function LoginForm() {
  const login = async (formData: FormData) => {
    'use server'
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
      const data: ErrorResponse = await res.json()
      return redirect("/login?type=error&message=" + data.message)
    }
    const data: LoginResponse = await res.json()
    const cookieStore = await cookies()
    cookieStore.set("accessToken", data.token)

    return redirect("/")
  }

  return (
    <form action={login}>
      <label className="font-medium" htmlFor="email">Email</label>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="e.g lorem@mail.com"
        defaultValue="user1@yopmail.com"
      />

      <label className="font-medium" htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="your password"
        defaultValue="password"
      />

      <Button className="w-full">Login</Button>
    </form>
  )
}
