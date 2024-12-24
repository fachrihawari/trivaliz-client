import Image, { StaticImageData } from "next/image";

type SlideProps = {
  title: string
  description: string
  image: StaticImageData
}
export default function Slide(props: SlideProps) {
  const { title, description, image } = props

  return (
    <div className='flex flex-col h-full justify-center items-center space-y-4'>
      <div>
        <Image
          src={image}
          className='w-64 h-64'
          alt={title}
        />
      </div>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      <p className='text-center'>{description}</p>
    </div>
  )
}
