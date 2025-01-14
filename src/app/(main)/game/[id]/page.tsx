'use client'

import { useAtom } from "jotai";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { gameAtom, rankingsAtom, statusAtom } from "@/atoms/game";
import { getGame } from "@/actions/game";
import dynamic from "next/dynamic";
import { socket } from "@/lib/socket";
import { userAtom } from "@/atoms/user";

const Lobby = dynamic(() => import("./components/lobby"))
const Question = dynamic(() => import("./components/question"))
const Result = dynamic(() => import("./components/result"))
const loadingComponent = <div className="min-h-full flex justify-center items-center">Loading...</div>

export default function GamePage() {
  const { id } = useParams<{ id: string }>()
  const [status, setStatus] = useAtom(statusAtom)
  const [game, setGame] = useAtom(gameAtom)
  const [user] = useAtom(userAtom)
  const [loading, setLoading] = useState(true)
  const [, setRankings] = useAtom(rankingsAtom)

  useEffect(() => {
    if (user) {
      getGame(id).then((data) => {
        if (data.status === 'ended') {
          setStatus('done')
          setRankings(data.rankings)
        } else {
          setStatus(data.mode === 'SP' ? 'playing' : 'waiting')
        }
        setGame(data)
      }).catch(err => {
        alert(err.message)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [id, setStatus, setGame, setRankings, user])

  useEffect(() => {
    if (game && user && game.status !== 'ended') {
      socket.emit("joinRoom", {
        gameId: game.id,
        playerId: user.id
      })
    }
  }, [game, user])

  if (loading) {
    return loadingComponent
  }

  return (
    <Suspense fallback={loading}>
      {status === 'waiting' && <Lobby />}
      {status === 'playing' && <Question />}
      {status === 'done' && <Result />}
    </Suspense>
  )

}
