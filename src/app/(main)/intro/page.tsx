'use client'

import { markIntroShown } from "@/actions/cookies"
import { useRouter } from "next/navigation"

export default function IntroPage() {
  const router = useRouter()

  return (
    <div>
      <h1 className="text-2xl">Intro Page</h1>
      <p>coming soon!</p>

      <button onClick={async () => {
        // console.log('marking intro shown')
        await markIntroShown()
        router.push('/login')
      }}>go to Intro</button>
    </div>
  )
}
