import BookForm from '@/components/Form/BookForm'
import BookData from '../../assets/data/booksMood.json'
const PersonalFormData: dataObject[] = [
  {
    field: 'name',
    data: {
      placeholder: 'eg. Tom',
      name: 'Name',
      type: 'input',
    },
  },
  {
    field: 'gender',
    data: {
      placeholder: 'eg. Male',
      name: 'Gender',
      type: 'input',
    },
  },
  {
    field: 'age',
    data: {
      placeholder: 'eg. Tom',
      name: 'Age',
      type: 'input',
    },
  },
  {
    field: 'eyesColor',
    data: {
      placeholder: 'eg. blue',
      name: 'Eyes Color',
      type: 'input',
    },
  },
  {
    field: 'hairColor',
    data: {
      placeholder: 'eg. dark brown',
      name: 'Hair Color',
      type: 'input',
    },
  },
]

const StoryFormData: dataObject[] = [
  {
    field: 'genre',
    data: {
      placeholder: 'eg. Fantasy',
      name: 'Book genre',
      type: 'select',
      additionalData: BookData.bookGenre,
    },
  },
  {
    field: 'mood',
    data: {
      placeholder: 'eg. Humorous',
      name: 'Book mood',
      type: 'select',
      additionalData: BookData.bookMoods,
    },
  },
  {
    field: 'placeOfAction',
    data: {
      placeholder: 'eg. Forest',
      name: 'Place of action',
      type: 'input',
    },
  },
  {
    field: 'additionalInfo',
    data: {
      placeholder: 'eg. Magic items, characters...',
      name: 'Additional informations',
      type: 'input',
    },
  },
]

type BookGenres = {
  bookMoods: string[]
  bookGenre: string[]
}
export interface dataObject {
  field:
    | 'name'
    | 'gender'
    | 'age'
    | 'eyesColor'
    | 'hairColor'
    | 'genre'
    | 'mood'
    | 'placeOfAction'
    | 'additionalInfo'
  data: {
    placeholder: string
    name: string
    type: string
    additionalData?: string[]
  }
}

const formData: dataObject[][] = [PersonalFormData, StoryFormData]

export default function Book() {
  return (
    <div className="flex flex-1 p-8 justify-center items-center">
      <BookForm data={formData} />
    </div>
  )
}
