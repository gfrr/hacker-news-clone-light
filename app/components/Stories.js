import React from 'react'

import { getStories } from '../utils/api'
import Loading from './Loading'

const storiesReducer = (state, { type, message, stories }) => {
  switch(type) {
    case 'loading':
      return {
        ...state,
        loading: true
      }
    case 'success':
      return {
        stories,
        loading: false,
        error: null
      }
    case 'error':
      return {
        ...state,
        loading: false,
        error: message
      }
    default:
      throw new Error('Unknown action dispatched')
  }
}

export default function Stories({ location }) {
  const storyType = location.pathname === '/new' ? 'new' : 'top'
  const [{ stories, loading, error}, dispatch] = React.useReducer(storiesReducer, {
    stories: [],
    loading: true,
    error: null
  })

  React.useEffect(() => {
    dispatch({type:'loading'})
    getStories(storyType)
      .then(stories => dispatch({type: 'success', stories}))
      .catch(({ message }) => dispatch({type: 'error', message }))
  }, [storyType])

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
          {JSON.stringify(story, null, 2)}
        </li>
      ))}
    </ul>
  ) 
}