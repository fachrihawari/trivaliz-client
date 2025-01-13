'use client'

import { useGoogleLogin } from "@react-oauth/google";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMail } from "react-icons/io5";
import googleIcon from '@/assets/icons/google.svg';
import Button from "@/components/button";
import { googleLogin } from "@/actions/auth";
import { userAtom } from "@/atoms/user";

export default function OtherButtons() {
  const [, setUser] = useAtom(userAtom)
  const router = useRouter()
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const user = await googleLogin({ type: 'auth-code', value: codeResponse.code })
      setUser(user)
      router.push("/")
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <Button as={Link} href="/login" variant="outlined">
        <IoMail size={24} />
        <span>Sign in with Email</span>
      </Button>
      <Button onClick={() => login()} variant="outlined">
        <Image width={24} height={24} src={googleIcon} alt="google sign in" />
        <span>Sign in with Google</span>
      </Button>
    </div>
  )
}
