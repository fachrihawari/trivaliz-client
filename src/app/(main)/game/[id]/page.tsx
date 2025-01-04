'use client'

import Question from "./components/question";
import Result from "./components/result";
import { statusAtom } from "@/atoms/game";
import { useAtom } from "jotai";

export default function GamePage() {
  const [status] = useAtom(statusAtom)

  return status === 'done' ? <Result /> : <Question />
}
