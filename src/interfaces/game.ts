export interface IGame {
  id: string
  status: string
  country: string
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  answers: IAnswer[]
}

export interface IAnswer {
  text: string
}
