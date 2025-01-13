import { logout } from "@/actions/auth";
import { getProfile } from "@/actions/user";
import { userAtom } from "@/atoms/user";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { GiJusticeStar } from "react-icons/gi";
import { LuSettings, LuBadgeHelp, LuLogOut } from "react-icons/lu";

export default function Header() {
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    getProfile().then(setUser)
  }, [setUser])

  return (
    <div className="flex h-16 px-4 items-center gap-x-2 text-gray-600 border-b">
      <Image alt="profile" src={user?.picture ?? 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=empty'} width={40} height={40} className="border rounded-lg" />
      <div className="flex-1">
        <h1>
          Hi, <span className="font-bold">{user?.username}</span>
        </h1>
        <div className="flex items-center text-amber-400 font-bold">
          <GiJusticeStar /> {user?.xp} XP
        </div>
      </div>

      <div className="flex">
        <Link href='/settings' className='hover:bg-gray-100 p-2 rounded-lg'>
          <LuSettings size={30} />
        </Link>

        <Link href='/help' className='hover:bg-gray-100 p-2 rounded-lg'>
          <LuBadgeHelp size={30} />
        </Link>

        <button onClick={logout} className="hover:bg-gray-100 p-2 rounded-lg">
          <LuLogOut size={30} />
        </button>
      </div>
    </div>
  )
}
