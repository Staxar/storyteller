import PersonalInformationsForm from '@/components/Form/PersonalInformationsForm'

async function getData() {
  const res = await fetch('http://localhost:3000/api/openai', {
    method: 'POST',
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'What is a capital of Poland?' }],
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data!')
  }
  console.log('res:::: ', res)
  return res.json()
}

export default async function Book() {
  const data = await getData()
  console.log(data)
  return (
    <div className="h-full w-full flex flex-col items-center p-24">
      <div className="p-8">
        <p className="text-xl">Give us some information to create adventure</p>
      </div>

      {/* <div className="h-12 flex flex-row gap-6 justify-center w-1/2">
        <UserCircleIcon />
        <RocketLaunchIcon />
      </div> */}

      <div className="p-4 w-[500px] ">
        <PersonalInformationsForm />
      </div>
      <button
        title="Press me!"
        className="h-6 bg-cyan-500 rounded p-4 items-center justify-center text-center flex active:bg-slate-600"
      >
        Press me!
      </button>
    </div>
  )
}

//<label className="p-4">Child name:</label>
//<input className="p-2 text-black border-1 " type="text" value={personalInformation.childName} onChange={handleInputChange} name='childName' placeholder="eg. Tom"/>
