import React from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Todo } from './type'

export const TodoListItem: React.FC<{ id: Todo['id'] }> = ({ id }) => {
  const { data, status, fetchStatus } = useQuery<Todo, Error>({
    queryKey: ['todo', id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
        (response) => response.json()
      ),
    enabled: id > 0,
  })

  console.log({ fetchStatus })
  if (status === 'loading' && fetchStatus === 'idle') {
    return null
  }
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    return <div>Error!</div>
  }

  return (
    <div>
      <h2>{data.title}</h2>
      <div>{data.completed && '✅'}</div>
    </div>
  )
}
