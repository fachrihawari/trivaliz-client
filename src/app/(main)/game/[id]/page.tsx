'use client'

import Lobby from "./components/lobby";
import Question from "./components/question";
import Result from "./components/result";
import { statusAtom } from "@/atoms/game";
import { useAtom } from "jotai";

export default function GamePage() {
  const [status] = useAtom(statusAtom)

  if (status === 'waiting') return <Lobby />
  if (status === 'playing') return <Question />
  if (status === 'done') return <Result />

  return <div>Loading...</div>
}
