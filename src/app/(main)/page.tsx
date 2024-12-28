'use client'

import { LuCrown } from "react-icons/lu";
import Header from "./components/header";
import Link from "next/link";
import { GiCheckeredFlag } from "react-icons/gi";
import Image from "next/image";

const games = [
  {
    name: "Food in USA",
    country: "USA",
    flag: "https://flagcdn.com/40x30/us.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Indonesia",
    country: "ID",
    flag: "https://flagcdn.com/40x30/id.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Malaysia",
    country: "MY",
    flag: "https://flagcdn.com/40x30/my.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Singapore",
    country: "SG",
    flag: "https://flagcdn.com/40x30/sg.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Thailand",
    country: "TH",
    flag: "https://flagcdn.com/40x30/th.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Japan",
    country: "JP",
    flag: "https://flagcdn.com/40x30/jp.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Korea",
    country: "KR",
    flag: "https://flagcdn.com/40x30/kr.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in China",
    country: "CN",
    flag: "https://flagcdn.com/40x30/cn.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in Vietnam",
    country: "VN",
    flag: "https://flagcdn.com/40x30/vn.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  },
  {
    name: "Food in India",
    country: "IN",
    flag: "https://flagcdn.com/40x30/in.png",
    startedAt: "2021-07-01",
    players: 4,
    winner: "Player 1",
  }
]

export default function Home() {
  return (
    <div className="relative h-full overflow-hidden">
      <Header />

      <div className="bg-white absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
        <Link href='/start' className="border border-primary gap-x-2 bg-primary text-lg font-semibold text-white flex items-center justify-center px-8 py-2 rounded-lg">
          <GiCheckeredFlag size={24} />
          Start New Game
        </Link>
      </div>

      <div className="px-4 pt-4 overflow-y-scroll h-full pb-40">
        <h1 className="text-2xl">Recent games</h1>
        {games.map((game, index) => (
          <div key={index} className="flex items-center mt-4 gap-x-4 p-4 border  rounded-xl">
            <Image src={game.flag} width={40} height={30} alt={`${game.country} flag`} className="rounded-md" />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{game.name}</h2>
                <p className="text-sm text-gray-500">{new Date(game.startedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-sm">{game.players} players</p>
                <div className="flex items-center gap-x-2 text-emerald-600">
                  <LuCrown />
                  <p className="text-sm font-medium">{game.winner} won</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
