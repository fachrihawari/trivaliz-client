'use client'

import { useAtom } from "jotai"
import { userAtom } from "@/atoms/user"
import { FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { LuArrowLeft, LuPencil } from "react-icons/lu"
import Link from "next/link"
import Input from "@/components/input"
import dynamic from "next/dynamic"
import { OptionProps } from "react-select"
import { SingleValueProps } from "react-select"
import countries from '@/data/countries.json';
import Button from "@/components/button"
import { getProfile, updateProfile } from "@/actions/user"

// Fix hydration mismatch error
const Select = dynamic(() => import('react-select'), { ssr: false }) as typeof import('react-select').default

type CountryOption = {
  flag: string
  name: string
  code: string
}

const CustomOption = (props: OptionProps<CountryOption>) => {
  const { innerProps, isSelected, label, data } = props

  let className = 'flex hover:bg-primary hover:text-white px-4 py-2 items-center gap-x-4'
  if (isSelected) className += ' text-white bg-primary'

  return (
    <div {...innerProps} className={className}>
      <Image src={data.flag} width={30} height={10} className="border" alt={data.code + ' flag'} />
      {label}
    </div>
  )
}

const CustomSingleValue = (props: SingleValueProps<CountryOption>) => {
  const { innerProps, children } = props
  const data = props.data as CountryOption
  const className = 'absolute flex px-4 py-2 items-center gap-x-4'

  return (
    <div {...innerProps} className={className}>
      <Image src={data.flag} width={30} height={10} className="border" alt={data.code + ' flag'} />
      {children}
    </div>
  )
}
export default function ProfilePage() {
  const [user, setUser] = useAtom(userAtom)
  const [username, setUsername] = useState('')
  const [picturePreview, setPicturePreview] = useState('')
  const [country, setCountry] = useState<CountryOption | null>(null)
  const [picture, setPicture] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUsername(user?.username || '')
    setPicturePreview(user?.picture || '')

    const country = countries.find(c => c.name === user?.country)
    setCountry(country || null)
  }, [user])

  useEffect(() => {
    getProfile().then(setUser)
  }, [setUser])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', username)
    if (country) formData.append('country', country.name)
    if (picture) formData.append('photo', picture)

    await updateProfile(formData)

    alert('Profile updated successfully')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPicturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-dvh bg-white">
      <div className="h-14 px-4 border-b flex items-center">
        <Link href="/" replace className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <LuArrowLeft size={24} />
        </Link>
        <h1 className="ml-2 font-medium">Profile</h1>
      </div>


      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="relative">
              <Image
                src={picturePreview || 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=empty'}
                alt="Profile"
                width={160}
                height={160}
                className="rounded-full h-[160px] w-[160px] border shadow-lg transition-transform hover:scale-105"
              />
              <div onClick={() => fileRef.current?.click()} className="cursor-pointer absolute bottom-0 right-4 rounded-full p-2 shadow-md z-50 bg-primary">
                <LuPencil size={20} className="text-white" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="font-medium" htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="e.g lorem@mail.com"
            value={user?.email || ''}
            className="read-only:bg-gray-100"
            readOnly
          />

          <label className="font-medium" htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="font-medium" htmlFor="country">Country</label>
          <Select
            className="mt-2"
            isSearchable
            onChange={(country) => setCountry(country as CountryOption)}
            value={country}
            name="country"
            getOptionLabel={(opt) => opt.name}
            getOptionValue={(opt) => opt.code}
            options={countries}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
            classNames={{
              control: () => '!h-12 !px-2 !rounded-lg'
            }}
          />


        </div>

        <Button className="w-full" type="submit">Save Changes</Button>
      </form>
    </div>
  )
}
