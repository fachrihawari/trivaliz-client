"use client"

import { login } from "@/actions/auth"
import { userAtom } from "@/atoms/user"
import Button from "@/components/button"
import Input from "@/components/input"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "user1@yopmail.com",
    password: "password"
  })
  const [, setUser] = useAtom(userAtom)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const user = await login(form)
      setUser(user)
      router.push("/")
    } catch (error) {
      console.log(error as Error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="font-medium" htmlFor="email">Email</label>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="e.g lorem@mail.com"
        value={form.email}
        onChange={handleChange}
      />

      <label className="font-medium" htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="your password"
        value={form.password}
        onChange={handleChange}
      />

      <Button className="w-full">Login</Button>
    </form>
  )
}
