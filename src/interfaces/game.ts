import { IUser } from "./user"

export interface IGame {
  id: string
  status: string
  country: string
  hostId: string
  mode: 'SP' | 'MP'
  questions: IQuestion[]
  createdAt: string
  players: Record<string, number>
  rankings: IRanking[]
}

export interface IQuestion {
  question: string
  answers: IAnswer[]
}

export interface IAnswer {
  text: string
}

export interface IRanking {
  playerId: string
  score: number
  player: IUser
}
