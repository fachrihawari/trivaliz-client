'use client'

import dynamic from "next/dynamic";
import Header from "./components/header";
import countries from '@/data/countries.json';
import { LuUser, LuUsers } from "react-icons/lu";
import { useState } from "react";
import { motion } from 'motion/react'
import Button from "@/components/button";
import { GiCheckeredFlag } from "react-icons/gi";
import { SingleValueProps, type OptionProps } from 'react-select'
import Image from "next/image";

const Select = dynamic(() => import('react-select'), { ssr: false });


type CountryOption = {
  flag: string
  name: string
  code: string
}

const CustomOption = (props: OptionProps) => {
  const { innerProps, isSelected, label } = props
  const data = props.data as CountryOption

  let className = 'flex hover:bg-primary hover:text-white px-4 py-2 items-center gap-x-4'
  if (isSelected) className += ' text-white bg-primary'

  return (
    <div {...innerProps} className={className}>
      <Image src={data.flag} width={30} height={10} className="border" alt={data.code + ' flag'} />
      {label}
    </div>
  )
}

const CustomSingleValue = (props: SingleValueProps) => {
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

const modes = [
  {
    name: 'Single Player',
    icon: LuUser,
    value: 'SP'
  },
  {
    name: 'Multi Player',
    icon: LuUsers,
    value: 'MP'
  }
] as const

export default function StartPage() {
  const [mode, setMode] = useState<'MP' | 'SP'>('SP')

  return (
    <>
      <Header />

      <form className="px-6 pt-6 flex flex-col">
        <label className="mb-2 font-medium">Country</label>
        <Select
          className="mt-2"
          isSearchable
          onChange={console.log}
          name="country"
          getOptionLabel={(opt) => (opt as CountryOption).name}
          getOptionValue={(opt) => (opt as CountryOption).code}
          options={countries}
          components={{
            Option: CustomOption,
            SingleValue: CustomSingleValue,
          }}
          styles={{
            control: (styles) => ({
              ...styles,
              borderRadius: 1000,
              height: '48px',
              padding: '0px 8px'
            })
          }}
        />

        <label className="mt-4 mb-2 font-medium">Mode</label>
        <div className="flex mt-2 gap-x-4">
          {modes.map((current) => {
            const className = mode === current.value ? 'border-primary text-primary' : '';
            return (
              <Button type='button' variant="outlined" onClick={() => setMode(current.value)} key={current.value} className={`cursor-pointer flex gap-x-2 items-center justify-center w-1/2 h-12 border rounded-full ${className}`}>
                <current.icon />
                <span>{current.name}</span>
              </Button>
            )
          })}
        </div>

        <Button className="mt-8">
          <GiCheckeredFlag />

          Start
        </Button>
      </form>
    </>
  );
}
