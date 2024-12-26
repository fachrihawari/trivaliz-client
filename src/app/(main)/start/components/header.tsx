import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function Header() {
  return (
    <div className="border-b h-20 flex px-4 items-center gap-x-4">
      <Link replace href='/'><LuArrowLeft className="text-3xl" /></Link>
      <h1 className="text-2xl">Start New Game</h1>
    </div>
  )
}
