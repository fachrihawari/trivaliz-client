import Button from "@/components/button"
import Input from "@/components/input"
import { ChangeEventHandler, useState } from "react"

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target
    setForm(draft => {
      return {
        ...draft,
        [name]: value
      }
    })
  }

  return (
    <form>
      <label className="font-medium" htmlFor="email">Email</label>
      <Input
        id="email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="e.g lorem@mail.com"
      />

      <label className="font-medium" htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="your password"
      />

      <Button>Login</Button>
    </form>
  )
}
