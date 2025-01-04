'use client'

import countries from '@/data/countries.json';
import { LuUser, LuUsers } from "react-icons/lu";
import { useState } from "react";
import Button from "@/components/button";
import { GiCheckeredFlag } from "react-icons/gi";
import Select from 'react-select';
import type { SingleValue, SingleValueProps, OptionProps } from 'react-select'
import Image from "next/image";
import { Sheet } from 'react-modal-sheet';
import { startGame } from '@/actions/game';
import { AiOutlineLoading } from 'react-icons/ai';
import { answersAtom, currentQuestionIndexAtom, gameAtom, scoreAtom, statusAtom, timerAtom } from '../../../atoms/game';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { RESET } from 'jotai/utils';

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
  const [country, setCountry] = useState<SingleValue<CountryOption>>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [_game, setGame] = useAtom(gameAtom)
  const [_timer, setTimer] = useAtom(timerAtom)
  const [_status, setStatus] = useAtom(statusAtom)
  const [_currentQuestionIndex, setCurrentQuestionIndex] = useAtom(currentQuestionIndexAtom)
  const [_answers, setAnswers] = useAtom(answersAtom)
  const [_score, setScore] = useAtom(scoreAtom)

  const router = useRouter()

  const close = () => setOpen(false)
  const isValid = !!country && !!mode

  return (

    <Sheet
      isOpen={open}
      onClose={close}
      snapPoints={[400, 0]}
      onSnap={(snapIndex) => {
        if (snapIndex === 1) close()
      }}
      initialSnap={0}
    >
      <Sheet.Backdrop onTap={close} />
      <Sheet.Container className='!rounded-tl-3xl !rounded-tr-3xl !max-w-md sm:!left-[calc(50%-14rem)]' >
        <Sheet.Header />
        <Sheet.Content>
          <h1 className='text-2xl px-6 text-center'>Start New Game</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!isValid) return
              setIsLoading(true)
              const result = await startGame(country.code, mode)
              if (result) {
                setGame(result)
                setTimer(RESET)
                setCurrentQuestionIndex(RESET)
                setAnswers(RESET)
                setScore(RESET)
                // TODO: status must be waiting if multi player
                setStatus('playing')

                router.push(`/game/${result.id}`)
              }
              setIsLoading(false)
            }}
            className="px-6 pt-6 flex flex-col">
            <label className="mb-2 font-medium">Country</label>
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

            <label className="mt-4 mb-2 font-medium">Mode</label>
            <div className="flex mt-2 gap-x-4">
              {modes.map((current) => {
                const className = mode === current.value ? 'border-primary text-primary' : '';
                return (
                  <Button type='button' variant="outlined" onClick={() => setMode(current.value)} key={current.value} className={`w-1/2 hover:scale-105 transition ease-in-out duration-300 ${className}`}>
                    <current.icon />
                    <span>{current.name}</span>
                  </Button>
                )
              })}
            </div>

            <Button disabled={!isValid || isLoading} className="mt-8">
              {isLoading ? <AiOutlineLoading className="animate-spin" /> : <GiCheckeredFlag />}
              Start
            </Button>
          </form>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
