import Image from "next/image"
import Form from "./components/form"
import Separator from "./components/separator"
import OtherButtons from "./components/other_buttons"
import trivalizLogo from "@/assets/icons/trivaliz.png"

export default function RegisterPage() {
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

      <Form />
      <Separator />
      <OtherButtons />
    </div>
  )

}
