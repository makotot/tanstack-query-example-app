import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Todo } from './type'
import { TodoListItem } from './TodoListItem'

export const TodoList: React.FC = () => {
  const { data, status } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
        response.json()
      ),
  })
  const [currentId, setCurrentId] = useState<number>(0)

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    return <div>Error</div>
  }

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    if (e.target instanceof HTMLAnchorElement) {
      setCurrentId(Number(e.target.dataset.id))
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
      }}>
      <div>
        <h2>Todo</h2>
        <ul>
          {data?.map(({ id, title }) => {
            return (
              <li key={id}>
                <div>
                  <a href="#" onClick={handleClick} data-id={id}>
                    {title}
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <TodoListItem id={currentId} />
    </div>
  )
}
