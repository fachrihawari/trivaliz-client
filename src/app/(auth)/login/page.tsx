'use client'

import Button from "@/components/button"
import { useState } from "react"

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = () => { }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6">
      <p className="mb-12">Trivaliz bonding with your fams</p>

      <form>
        <label className="font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="e.g lorem@mail.com"
          className="w-full border border-gray-300 rounded-full h-14 px-6 mb-6 mt-3"
        />

        <label className="font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="your password"
          className="w-full border border-gray-300 rounded-full h-14 px-6 mb-6 mt-3"
        />

        <Button>Login</Button>
      </form>

    </div>
  )

}
