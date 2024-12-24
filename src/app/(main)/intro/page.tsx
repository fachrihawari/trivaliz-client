'use client'

import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtons from './components/swiper_buttons';
import Slide from './components/slide';
import data from './data';


export default function IntroPage() {
  return (
    <div className='p-4 h-dvh'>
      <Swiper
        spaceBetween={0} className='h-full'>
        {data.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}

        <SwiperButtons />
      </Swiper>
    </div>
  )
}
