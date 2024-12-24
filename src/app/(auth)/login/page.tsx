'use client'

import Image from "next/image"
import LoginForm from "./components/form"
import Separator from "./components/separator"
import SocialButtons from "./components/social_buttons"
import trivalizLogo from "@/assets/icons/trivaliz.png"

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center h-full px-6">

      <Image
        width={150}
        height={75}
        alt="Trivaliz Logo"
        src={trivalizLogo}
        className="mx-auto"
      />
      <p className="mb-12 text-lg mx-auto text-center">the ultimate trivia showdown</p>

      <LoginForm />
      <Separator />
      <SocialButtons />
    </div>
  )

}
