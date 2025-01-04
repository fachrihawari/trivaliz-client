import Image, { StaticImageData } from "next/image";

type SlideProps = {
  title: string
  description: string
  image: StaticImageData
}
export default function Slide(props: SlideProps) {
  const { title, description, image } = props

  return (
    <div className='flex flex-col h-full items-center pt-4 px-4'>
      <div className="bg-gradient-to-b from-[#F5F7F4] to-secondary h-3/5 flex justify-center items-center w-full rounded-lg">
        <Image
          src={image}
          className='w-72 h-72'
          alt={title}
        />
      </div>
      <div className="mt-8 text-center">
        <h1 className='text-3xl font-semibold'>{title}</h1>
        <p className='mt-4 text-center'>{description}</p>
      </div>
    </div>
  )
}
