export interface IGame {
  id: string
  status: string
  country: string
  hostId: string
  mode: 'SP' | 'MP'
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  answers: IAnswer[]
}

export interface IAnswer {
  text: string
}
