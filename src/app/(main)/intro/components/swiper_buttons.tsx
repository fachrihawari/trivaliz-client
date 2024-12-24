import { markIntroShown } from "@/actions/cookies"
import Button from "@/components/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FiArrowRight } from "react-icons/fi"
import { useSwiper } from "swiper/react"

export default function SwiperButtons() {
  const router = useRouter()
  const swiper = useSwiper()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    swiper.on('activeIndexChange', (swiper) => {
      setActiveIndex(swiper.activeIndex)
    })

    return () => {
      swiper.off('activeIndexChange')
    }
  }, [swiper])

  const goToLogin = async () => {
    await markIntroShown()
    router.push('/login')
  }

  return (
    <div className="z-10 absolute left-0 right-0 bottom-0 flex justify-between space-x-4">
      <Button className='font-bold' variant='flat' onClick={goToLogin}>Skip</Button>

      <div className='flex flex-row space-x-4'>
        {activeIndex > 0 && (
          <Button variant='outlined' className="w-12 h-12 border-primary text-primary" onClick={() => !swiper.slidePrev() && goToLogin()}>
            <FiArrowRight size={24} className='transform rotate-180' />
          </Button>
        )}
        <Button className="w-12 h-12" onClick={() => !swiper.slideNext() && goToLogin()}>
          <FiArrowRight size={24} />
        </Button>
      </div>
    </div>
  )
}
