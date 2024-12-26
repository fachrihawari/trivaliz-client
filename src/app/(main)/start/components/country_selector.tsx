import { useState, useRef, useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { motion } from 'motion/react'
import countries from "@/data/countries.json"
import { AnimatePresence } from "motion/react";
import Image from "next/image";

export default function CountrySelector() {
  const [selected, setSelected] = useState('ID')
  const ref = useRef<HTMLDivElement>(null)

  const sortedCountries = [...countries].sort((a, b) => {
    if (a.code === selected) return -1;
    if (b.code === selected) return 1;
    return 0;
  });

  useEffect(() => {
    ref.current?.scrollTo({
      left: 0,
      behavior: 'smooth'
    })
  }, [selected])

  return (
    <div className="flex flex-col pt-4">
      <div className="px-4 flex justify-between items-center">
        <h1 className="text-2xl font-medium">Country</h1>
        <p className="flex gap-x-2 items-center">See All <LuArrowRight /></p>
      </div>
      <AnimatePresence>
        <div ref={ref} className="flex pl-4 pt-4 pb-4 gap-x-4 overflow-x-scroll">
          {sortedCountries.map((country) => {
            return (
              <CountryPill key={country.code} onSelect={setSelected} selected={selected} country={country} />
            )
          })}
        </div>
      </AnimatePresence>
    </div>
  )
}

type CountryPillProps = {
  country: {
    code: string,
    name: string,
    flag: string
  }
  selected: string
  onSelect: (code: string) => void
}
function CountryPill({ country, selected, onSelect }: CountryPillProps) {
  const className = selected === country.code ? 'bg-primary text-white' : ''
  return (
    <motion.div whileHover={{ scale: 1.1 }} layout onClick={() => onSelect(country.code)} className={`border flex justify-center items-center whitespace-nowrap py-2 px-6 rounded-full cursor-pointer ${className}`}>
      <Image src={country.flag} width={40} height={10} className="w-10 h-3 border" alt={country.code + ' flag'} />
      <span className="ml-2">{country.name}</span>
    </motion.div>
  )

}
