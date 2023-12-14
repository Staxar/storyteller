import { ChangeEvent } from 'react'

interface userInputInterface {
  value: string
  placeholder: string
  onChangeHandler?: (textInput: ChangeEvent<HTMLInputElement>) => void
  label: string
}

function UserInputComponent({
  value,
  placeholder,
  onChangeHandler,
  label,
}: userInputInterface) {
  return (
    <>
      <p>{label}</p>
      <input
        name={placeholder}
        type="text"
        className="p-1 rounded-lg"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
      />
    </>
  )
}

export default UserInputComponent
