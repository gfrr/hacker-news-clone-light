import React from 'react'

import { fetchPopularStories } from '../utils/api'
import { useFetch } from '../hooks/useFetch'
import Loading from './Loading'
import Story from './Story'

export default function Stories({ location }) {
  const storyType = location.pathname === '/new' ? 'new' : 'top'
  const { stories, loading, error } = useFetch(fetchPopularStories, [storyType], [storyType], 'stories')

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p className="center-text error">error</p>
  }

  return (
    <ul>
      {stories.map(story => (
        <li
          key={story.id}
          className="post">
          <Story story={story} />
        </li>
      ))}
    </ul>
  )
}
