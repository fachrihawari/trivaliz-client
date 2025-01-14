'use client'

import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { useParams } from "next/navigation";
import { gameAtom, rankingsAtom, statusAtom } from "@/atoms/game";
import { getGame } from "@/actions/game";
import dynamic from "next/dynamic";
import { socket } from "@/lib/socket";
import { userAtom } from "@/atoms/user";

const Lobby = dynamic(() => import("./components/lobby"))
const Question = dynamic(() => import("./components/question"))
const Result = dynamic(() => import("./components/result"))
const loading = <div className="min-h-full flex justify-center items-center">Loading...</div>

export default function GamePage() {
  const { id } = useParams<{ id: string }>()
  const [status, setStatus] = useAtom(statusAtom)
  const [game, setGame] = useAtom(gameAtom)
  const [, setRankings] = useAtom(rankingsAtom)
  const [user] = useAtom(userAtom)

  useEffect(() => {
    if (!game && user) {
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
      })
    }
  }, [game, id, setStatus, setGame, user])

  useEffect(() => {
    if (game && user) {
      socket.emit("joinRoom", {
        gameId: game.id,
        playerId: user.id
      })
    }
  }, [game, user])

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
