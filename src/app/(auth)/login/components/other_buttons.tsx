'use client'

import Button from "@/components/button";
import Image from "next/image";
import googleIcon from '@/assets/icons/google.svg';
import facebookIcon from '@/assets/icons/facebook.svg';
import { IoMail } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function OtherButtons() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-4">
      <Button onClick={() => router.push('/register')} variant="outlined">
        <IoMail size={24} />
        <span>Sign up with Email</span>
      </Button>
      <Button variant="outlined">
        <Image width={24} height={24} src={googleIcon} alt="google sign in" />
        <span>Sign in with Google</span>
      </Button>
      <Button variant="outlined">
        <Image width={24} height={24} src={facebookIcon} alt="facebook sign in" />
        <span>Sign in with Facebook</span>
      </Button>
    </div>
  )
}
