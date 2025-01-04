import { login } from "@/actions/auth"
import Button from "@/components/button"
import Input from "@/components/input"

export default function LoginForm() {
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
