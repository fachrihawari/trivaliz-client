'use client'

import 'swiper/css';
import { useRouter } from "next/navigation"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { FiArrowRight } from "react-icons/fi";
import { markIntroShown } from "@/actions/cookies"
import Button from '@/components/button';

export default function IntroPage() {
  return (
    <div className="p-4">
      <Swiper spaceBetween={0}>
        <SwiperSlide>
          <FirstSlide />
        </SwiperSlide>
        <SwiperSlide>
          <SecondSlide />
        </SwiperSlide>
        <SwiperSlide>
          <ThirdSlide />
        </SwiperSlide>

        <SwiperButtons />
      </Swiper>
    </div>
  )
}

function FirstSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-96 min-w-full bg-red-400">
      First Slide
    </div>
  )
}

function SecondSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-96 min-w-full bg-green-400">
      Second Slide
    </div>
  )
}

function ThirdSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-96 min-w-full bg-blue-400">
      Third Slide
    </div>
  )
}

function SwiperButtons() {
  const swiper = useSwiper()
  const router = useRouter()

  const goToLogin = async () => {
    await markIntroShown()
    router.push('/login')
  }

  return (
    <div className="flex justify-between space-x-4">
      <Button variant='flat' onClick={goToLogin}>Skip</Button>
      <Button className="w-12 h-12" onClick={() => !swiper.slideNext() && goToLogin()}>
        <FiArrowRight />
      </Button>
    </div>
  )
}
