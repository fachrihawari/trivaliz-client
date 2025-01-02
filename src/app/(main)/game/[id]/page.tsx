'use client'

import { useState } from "react";
import Question from "./components/question";
import Result from "./components/result";

export default function GamePage() {
  const [done] = useState(true)

  return done ? <Result /> : <Question />
}
