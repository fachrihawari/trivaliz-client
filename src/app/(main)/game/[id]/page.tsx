'use client'

import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { useParams } from "next/navigation";
import { gameAtom, statusAtom } from "@/atoms/game";
import { getGame } from "@/actions/game";
import dynamic from "next/dynamic";

const Lobby = dynamic(() => import("./components/lobby"))
const Question = dynamic(() => import("./components/question"))
const Result = dynamic(() => import("./components/result"))
const loading = <div className="min-h-full flex justify-center items-center">Loading...</div>

export default function GamePage() {
  const { id } = useParams<{ id: string }>()
  const [status, setStatus] = useAtom(statusAtom)
  const [game, setGame] = useAtom(gameAtom)

  useEffect(() => {
    if (!game) {
      getGame(id).then((data) => {
        setStatus(data.mode === 'SP' ? 'playing' : 'waiting')
        setGame(data)
      }).catch(err => {
        alert(err.message)
      })
    }
  }, [game, id, setStatus, setGame])

  return (
    <Suspense
      fallback={loading}
    >
      {status === 'waiting' && <Lobby />}
      {status === 'playing' && <Question />}
      {status === 'done' && <Result />}
    </Suspense>
  )

}
