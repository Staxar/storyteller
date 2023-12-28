import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, ReactNode } from 'react'
import booksMood from '../assets/data/booksMood.json'
interface userInputInterface {
  value: string
  placeholder: string
  onChangeHandler?: (textInput: ChangeEvent<HTMLInputElement>) => void
  label: string
  icon: ReactNode
  isValid: boolean
}

function UserInputComponent({
  value,
  placeholder,
  onChangeHandler,
  label,
  icon,
  isValid,
}: userInputInterface) {
  return (
    <>
      <p className="text-slate-400">{label}</p>
      <div className="rounded h-6 w-full flex flex-row border border-black">
        <div className="h-full w-1/6 border-r border-black flex items-center justify-center">
          {icon}
        </div>
        <input
          name={placeholder}
          type="text"
          className={`h-full w-full mx-2 focus: outline-none ${
            isValid ? 'bg-transparent' : 'bg-red-700'
          }`}
          placeholder={placeholder}
          onChange={onChangeHandler}
          value={value}
        />
      </div>
    </>
  )
}

export default UserInputComponent
