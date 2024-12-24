'use client'

import { markIntroShown } from "@/actions/cookies"

export default function IntroPage() {
  return (
    <div>
      <h1 className="text-2xl">Intro</h1>

      <button onClick={() => {
        // console.log('marking intro shown')
        markIntroShown()
          .catch(console.log)
      }}>go to Intro</button>
    </div>
  )
}
