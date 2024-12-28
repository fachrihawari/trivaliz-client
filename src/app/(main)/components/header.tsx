import Image from "next/image";
import Link from "next/link";
import { GiJusticeStar } from "react-icons/gi";
import { LuSettings, LuBadgeHelp } from "react-icons/lu";

export default function Header() {
  return (
    <div className="flex h-16 px-4 items-center gap-x-4 text-gray-600 border-b">
      <Image alt="profile" src='https://api.dicebear.com/9.x/dylan/png?seed=tedante' width={40} height={40} className="border rounded-full" />
      <div className="flex-1">
        <h1>
          Hi, <span className="font-bold">Tedante</span>
        </h1>
        <div className="flex items-center text-amber-400 font-bold">
          <GiJusticeStar /> 323 XP
        </div>
      </div>

      <Link href='/settings' className='text-3xl'>
        <LuSettings />
      </Link>

      <Link href='/help' className='text-3xl'>
        <LuBadgeHelp />
      </Link>
    </div>
  )
}
