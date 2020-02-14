import React from 'react'

import { fetchAllStories } from '../utils/api'
import { useFetch } from '../hooks/useFetch'
import Loading from './Loading'
import Story from './Story'

export default function Stories({ location }) {
  const storyType = location.pathname === '/new' ? 'new' : 'top'
  const { stories, loading, error } = useFetch(fetchAllStories, [storyType], [storyType], 'stories')
  // const [{ stories, loading, error }, dispatch] = React.useReducer(storiesReducer, {
  //   stories: [],
  //   loading: true,
  //   error: null
  // })

  // React.useEffect(() => {
  //   dispatch({ type: 'loading' })
  //   fetchAllStories(storyType)
  //     .then(stories => dispatch({ type: 'success', stories }))
  //     .catch(({ message }) => dispatch({ type: 'error', message }))
  // }, [storyType])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p className="center-text error">error</p>
  }

  return (
    <ul>
      {stories.map(({ id, title, url, by, descendants, time }) => (
        <li
          key={id}
          className="post">
          <Story
            title={title}
            url={url}
            user={by}
            comments={descendants}
            id={id}
            time={time} />
        </li>
      ))}
    </ul>
  )
}
