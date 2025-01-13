"use client"

import { register } from "@/actions/auth"
import { userAtom } from "@/atoms/user"
import Button from "@/components/button"
import Input from "@/components/input"
import { useAtom } from "jotai"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { OptionProps, SingleValueProps } from "react-select"
import countries from '@/data/countries.json';
import Select from 'react-select'


export default function Form() {
  const [form, setForm] = useState({
    email: "user1@yopmail.com",
    password: "password",
    username: "user1",
  })
  const [country, setCountry] = useState<CountryOption | null>({
    code: 'ID',
    flag: 'https://flagcdn.com/w40/id.png',
    name: 'Indonesia'
  })
  const [, setUser] = useAtom(userAtom)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!country) return

    try {
      const user = await register({
        ...form,
        country: country?.name
      })
      setUser(user)
      router.push("/")
    } catch (error) {
      console.log(error as Error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="font-medium" htmlFor="email">Email</label>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="e.g lorem@mail.com"
        value={form.email}
        onChange={handleChange}
      />

      <label className="font-medium" htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="your password"
        value={form.password}
        onChange={handleChange}
      />

      <label className="font-medium" htmlFor="username">Username</label>
      <Input
        id="username"
        type="text"
        name="username"
        placeholder="your username"
        value={form.username}
        onChange={handleChange}
      />

      <label className="font-medium" htmlFor="country">Country</label>

      <Select
        className="mt-2 mb-4"
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

      <Button className="w-full">Register</Button>
    </form>
  )
}



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
