import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Post } from './type'

export const PostList: React.FC = () => {
  const { data, status } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
        response.json()
      ),
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <div style={{}}>
      <h2>Posts</h2>
      <ul>
        {data?.map(({ id, title }) => {
          return (
            <li key={id}>
              <div>
                <a href="#" onClick={() => {}} data-id={id}>
                  {title}
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
