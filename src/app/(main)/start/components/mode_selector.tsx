import { motion } from "motion/react";
import { useState } from "react";
import { LuUser, LuUsers } from "react-icons/lu";

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

export default function ModelSelector() {
  const [selected, setSelected] = useState<'SP' | 'MP'>('MP');

  return (
    <div className="px-4 mt-4">
      <h1 className="text-2xl font-medium">Mode</h1>

      <div className="flex mt-4 gap-x-4">
        {modes.map((mode) => {
          const className = selected === mode.value ? 'bg-primary text-white' : '';

          return (
            <motion.div onClick={() => setSelected(mode.value)} key={mode.value} whileHover={{ scale: 1.05 }} className={`cursor-pointer flex gap-x-4 items-center justify-center w-1/2 p-4 border rounded-lg ${className}`}>
              <mode.icon />
              <span>{mode.name}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
