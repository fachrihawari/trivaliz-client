'use client'

import Button from "@/components/button";
import Header from "./components/header";
import Start from './components/start'
import { useEffect, useState } from "react";
import { LuCrown, LuUser, LuUsers } from "react-icons/lu";
import { GiCheckeredFlag } from "react-icons/gi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getGamesHistory } from "@/actions/game";
import { IGame } from "@/interfaces/game";
import countries from "@/data/countries.json";
import Link from "next/link";
export default function Home() {
  const searchParams = useSearchParams()
  const start = Boolean(searchParams.get('start'))
  const [startOpen, setStartOpen] = useState(start)
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState<IGame[]>([])

  useEffect(() => {
    setLoading(true)
    getGamesHistory()
      .then((games) => {
        setGames(games)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="relative h-full overflow-hidden">
      <Header />

      <div className="z-50 bg-white absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
        <Button className="w-full" onClick={() => setStartOpen(true)}>
          <GiCheckeredFlag size={24} />
          Start New Game
        </Button>
      </div>

      <Start open={startOpen} setOpen={setStartOpen} />


      <div className="px-4 overflow-y-scroll h-full pb-40">

        {loading && [...(new Array(10))].map((_, index) => (
          <div key={index} className="flex items-center mt-4 gap-x-4 p-4 border rounded-lg animate-pulse">
            <div className="w-10 h-8 bg-slate-200 rounded"></div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-slate-200 rounded w-24"></div>
                <div className="h-4 bg-slate-200 rounded w-32"></div>
              </div>
              <div className="flex justify-between mt-1">
                <div className="h-4 bg-slate-200 rounded w-20"></div>
                <div className="flex items-center gap-x-2">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ))
        }

        {games.length > 0 && (
          <>
            <h1 className="text-2xl mt-4">Recent games</h1>
            {games.map((game, index) => (
              <Game key={index} game={game} />
            ))}
          </>
        )}

        {games.length === 0 && !loading && (
          <div className="flex flex-col h-full items-center justify-center text-gray-500">
            <GiCheckeredFlag size={64} className="mb-4 text-gray-400" />
            <p className="text-xl font-medium">No Game History</p>
            <p className="text-sm mt-2">Click the button below to start your first game!</p>
          </div>
        )}

      </div>
    </div>
  );
}

type GameProps = {
  game: IGame
}
function Game({ game }: GameProps) {
  const country = countries.find(c => c.name === game.country)
  if (!country) return null

  return (
    <Link href={`/game/${game.id}`}>
      <div className="flex items-center mt-4 gap-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
        <Image
          src={`https://flagcdn.com/40x30/${country.code.toLowerCase()}.png`}
          width={40}
          height={30}
          alt={`${game.country} flag`}
          className="rounded-sm"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">{game.country}</h2>
            <p className="text-sm text-gray-500">{new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(game.createdAt))}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-600 flex items-center flex-row">
              {game.mode === 'SP' ? <LuUser className="mr-1" /> : <LuUsers className="mr-1" />} {game.mode === 'SP' ? 'Single Player' : (
                `${Object.keys(game.players).length} players`
              )}
            </p>
            <div className="flex items-center gap-x-2 text-emerald-600">
              {/* TODO: Enable this once we get winner user */}
              {/* <LuCrown className="w-4 h-4" />
              <p className="text-sm font-medium">??? won</p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
