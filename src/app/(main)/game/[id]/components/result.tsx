'use client'

import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import { useAtom } from "jotai"
import { rankingsAtom } from "@/atoms/game"
import { IRanking } from "@/interfaces/game"
import Button from "@/components/button"
import Image from "next/image"

export default function Result() {
  const [rankings] = useAtom(rankingsAtom)
  const topThree = rankings.slice(0, 3)

  return (
    <div className="h-full relative bg-white">
      <div className="h-14 px-4 border-b flex items-center">
        <Link href="/" replace className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <LuArrowLeft size={24} />
        </Link>
        <h1 className="ml-2 font-medium">Results</h1>
      </div>
      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mt-4 pt-8 mb-12 w-full relative px-4">
        {/* Second Place */}
        {topThree[1] && (
          <div className="flex flex-col items-center animate-bounce-slow">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-4 border-blue-400 shadow-lg">
              <Image src={topThree[1].player.picture} width={64} height={64} alt="avatar user" className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-blue-600">{topThree[1].player.username}</p>
            <p className="text-blue-500 font-medium">
              <span className="text-lg">✨</span>
              {topThree[1].score} XP
            </p>
            <div className="w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-xl flex items-center justify-center mt-2 shadow-lg relative">
              <span className="text-white text-3xl font-bold">2</span>
            </div>
          </div>
        )}

        {/* First Place */}
        {topThree[0] && (
          <div className="flex flex-col items-center -mt-8 animate-bounce-slow">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-4 border-yellow-400 shadow-lg">
              <Image src={topThree[0].player.picture} width={80} height={80} alt="avatar user" className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-yellow-600">{topThree[0].player.username}</p>
            <p className="text-yellow-500 font-medium">
              <span className="text-lg">🌟</span>
              {topThree[0].score} XP
            </p>
            <div className="w-24 h-40 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-xl flex items-center justify-center mt-2 shadow-lg relative">
              <span className="text-white text-4xl font-bold">1</span>
            </div>
          </div>
        )}

        {/* Third Place */}
        {topThree[2] && (
          <div className="flex flex-col items-center animate-bounce-slow">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-4 border-purple-400 shadow-lg">
              <Image src={topThree[2].player.picture} width={64} height={64} alt="avatar user" className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-purple-600">{topThree[2].player.username}</p>
            <p className="text-purple-500 font-medium">
              <span className="text-lg">💫</span>
              {topThree[2].score} XP
            </p>
            <div className="w-24 h-28 bg-gradient-to-b from-purple-400 to-purple-500 rounded-t-xl flex items-center justify-center mt-2 shadow-lg relative">
              <span className="text-white text-3xl font-bold">3</span>
            </div>
          </div>
        )}

      </div>

      {/* Player List */}
      <div className="w-full space-y-4 px-4">
        {rankings.map((ranking, index) => <Ranking key={ranking.playerId} ranking={ranking} position={index + 1} />)}
      </div>

      {/* Call to Action Buttons */}
      <div className="bg-white absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
        <Button as={Link} className="w-full mb-2" href="/?start=true">
          Start New Game
        </Button>
      </div>
    </div>
  )
}


function Ranking({ ranking, position }: { ranking: IRanking, position: number }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image src={ranking.player.picture} alt="avatar user" width={48} height={48} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            {position}
          </div>
        </div>
        <div>
          <p className="font-medium">{ranking.player.username}</p>
          {/* <p className="text-gray-500">Answe Streaks</p> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-yellow-500">⭐</span>
        <span className="font-medium">{ranking.score} points</span>
      </div>
    </div>
  )
}
