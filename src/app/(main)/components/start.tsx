'use client'

import countries from '@/data/countries.json';
import { LuUser, LuUsers } from "react-icons/lu";
import { useState } from "react";
import Button from "@/components/button";
import { GiCheckeredFlag } from "react-icons/gi";
import { SingleValueProps, type OptionProps } from 'react-select'
import Image from "next/image";
import Select from 'react-select';
import { Sheet } from 'react-modal-sheet';

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

type StartPageProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
export default function StartPage({ open, setOpen }: StartPageProps) {
  const [mode, setMode] = useState<'MP' | 'SP'>('SP')

  return (

    <Sheet
      isOpen={open}
      onClose={() => setOpen(false)}
      snapPoints={[400, 0]}
      onSnap={(snapIndex) => {
        if (snapIndex === 1) setOpen(false)
      }}
      initialSnap={0}
    >
      <Sheet.Container style={{
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem'
      }}>
        <Sheet.Header />
        <Sheet.Content>
          <h1 className='text-2xl px-6 text-center'>Start New Game</h1>
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
                  <Button type='button' variant="outlined" onClick={() => setMode(current.value)} key={current.value} className={`cursor-pointer flex gap-x-2 items-center justify-center w-1/2 h-12 border rounded-full hover:scale-105 transition ease-in-out duration-300 ${className}`}>
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
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
