import { atomWithStorage } from "jotai/utils";
import { IGame } from "@/interfaces/game";
import { IUser } from "@/interfaces/user";

export const gameAtom = atomWithStorage<IGame | null>('game', null, undefined, { getOnInit: true })
export const timerAtom = atomWithStorage<number>('timer', 15, undefined, { getOnInit: true })
export const scoreAtom = atomWithStorage<number>('score', 0, undefined, { getOnInit: true })
export const statusAtom = atomWithStorage<'waiting' | 'playing' | 'done'>('status', 'waiting', undefined, { getOnInit: true })
export const currentQuestionIndexAtom = atomWithStorage<number>('currentQuestionIndex', 0, undefined, { getOnInit: true })
export const answersAtom = atomWithStorage<string[]>('answers', [], undefined, { getOnInit: true })
export const playersAtom = atomWithStorage<IUser[]>('players', [], undefined, { getOnInit: true })