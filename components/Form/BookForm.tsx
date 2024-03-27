'use client'
import { useId } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import BooksData from '../../assets/data/booksMood.json'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { dataObject, formObject } from '@/app/book/page'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Child name must be at least 2 characters.',
    })
    .max(255, { message: 'Too much characters!' }),
  gender: z
    .string()
    .min(2, {
      message: 'Gender must be at least 4 characters',
    })
    .max(255, { message: 'Too much characters!' }),
  age: z.coerce.number().positive({ message: 'Age must be positive number!' }),
  eyesColor: z
    .string()
    .min(2, { message: 'Eyes color must be at least 3 characters.' })
    .max(255, { message: 'Too much characters!' }),
  hairColor: z
    .string()
    .min(2, { message: 'Hair color must be at least 3 characters.' })
    .max(255, { message: 'Too much characters!' }),
  genre: z.string(),
  mood: z.string(),
  placeOfAction: z
    .string()
    .min(2, { message: 'Hair color must be at least 3 characters.' })
    .max(255, { message: 'Too much characters!' }),
  additionalInfo: z
    .string()
    .min(2, { message: 'Hair color must be at least 3 characters.' })
    .max(255, { message: 'Too much characters!' }),
})

interface DataInterface {
  data: dataObject[][]
  formDataResponse: (values: formObject) => void
}

export default function BookForm({ data, formDataResponse }: DataInterface) {
  //   console.log(Object.keys(formSchema.shape))
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: '',
      age: 0,
      eyesColor: '',
      hairColor: '',
      genre: data?.[1]?.[0]?.data?.additionalData?.[0] || '',
      mood: data?.[1]?.[1]?.data?.additionalData?.[0] || '',
      placeOfAction: '',
      additionalInfo: '',
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    formDataResponse(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              {data[0].map((item) => {
                return (
                  <FormField
                    key={useId()}
                    control={form.control}
                    name={item.field}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.data.name}</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="on"
                            maxLength={255}
                            placeholder={item.data.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>
            <div className="flex flex-col">
              {data[1].map((item) => {
                return (
                  <FormField
                    key={useId()}
                    control={form.control}
                    name={item.field}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.data.name}</FormLabel>
                        <FormControl>
                          {item.data.type === 'input' ? (
                            <Input
                              placeholder={item.data.placeholder}
                              {...field}
                            />
                          ) : (
                            <Select
                              onValueChange={field.onChange}
                              name={item.field}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      item.data.additionalData
                                        ? item.data.additionalData[0]
                                        : ''
                                    }
                                    defaultValue={
                                      item?.data?.additionalData?.[0] || ''
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {item.data.additionalData?.map((data) => {
                                  return (
                                    <SelectItem value={data} key={useId()}>
                                      {data}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>
          </div>
          <Button type="submit" className="w-1/2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
