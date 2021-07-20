import clsx from 'clsx'
import { FormEvent, useState } from 'react'
import { nanoid } from 'nanoid'

import { Container } from '../components/Container'

type ListItem = {
  title: string
  isChecked: boolean
  id: string
}

const createListItem = (title: string): ListItem => ({
  title,
  isChecked: false,
  id: nanoid(),
})

const HomePage = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState<ListItem[]>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const listItem = createListItem(value)

    setValue('')
    setList((prev) => [...prev, listItem])
  }

  const handleToggle = (id: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        }
      }

      return item
    })

    setList(newList)
  }

  const handleDelete = (id: string) => {
    const newList = list.filter((item) => item.id !== id)

    setList(newList)
  }

  return (
    <div className="px-4 py-10 min-h-screen bg-gray-100">
      <Container>
        <form
          className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
          onSubmit={handleSubmit}
        >
          <input
            className="p-4 w-full shadow outline-none"
            type="text"
            value={value}
            placeholder="Enter shopping item"
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            type="submit"
            className="py-2 px-8 text-white bg-purple-500 rounded shadow transition-colors hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </Container>

      <Container className="mt-10">
        <div className="p-6 bg-white shadow-xl min-h-[200px] pb-12">
          <div className="flex items-center mb-6 justify-between">
            <h2 className="text-2xl font-bold">
              {list.length > 0 ? 'Buy these items:' : 'No items to buy!'}
            </h2>

            {list.length > 0 ? <span>{list.length}</span> : null}
          </div>

          <ul className="space-y-2">
            {list.map((item, index) => (
              <li
                className={clsx('border border-gray-200 p-2 flex items-center')}
                key={index}
              >
                <span
                  className={clsx({
                    'line-through': item.isChecked,
                  })}
                >
                  {item.title}
                </span>

                <div className="ml-auto space-x-2">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="py-1 px-2 text-sm text-white bg-green-500 rounded transition-colors hover:bg-green-700"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="py-1 px-2 text-sm text-white bg-red-500 rounded transition-colors hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  )
}

export default HomePage
