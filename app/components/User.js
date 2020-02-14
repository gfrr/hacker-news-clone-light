import React from 'react'
import QueryString from 'query-string'
import PropTypes from 'prop-types'

import ThemeContext from '../contexts/theme'
import { useFetch } from '../hooks/useFetch'
import { fetchUser, fetchItems } from '../utils/api'
import Loading from './Loading'
import Story from './Story'

function UserProfile({ user }) {
  const { id, created, karma, about } = user
  const theme = React.useContext(ThemeContext)
  const since = React.useMemo(() => new Date(created * 1000).toLocaleString(), [created])

  return (
    <React.Fragment>
      <h1 className="title">{id}</h1>
      <div className={`meta-info ${theme}`}>
        <span>joined <b>{since}</b></span>
        <span>has {karma} karma</span>
      </div>
      {about && <p dangerouslySetInnerHTML={{ __html: about }} />}
    </React.Fragment>
  )
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    karma: PropTypes.number.isRequired,
    about: PropTypes.string
  }).isRequired
}

const filter = (result) => result.type === 'story'

function UserStories({ storiesIds }) {
  const { stories, loading, error } = useFetch(fetchItems, [storiesIds, filter], [storiesIds], 'stories')

  if (loading) {
    return <Loading text="Fetching posts" />
  }
  if (error) {
    return <p className="center-text error">error</p>
  }

  return stories && (
    <React.Fragment>
      <h2>Posts</h2>
      <ul>
        {stories.map(story => (
          <li
            key={story.id}
            className="post">
            <Story story={story} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

UserStories.propTypes = {
  storiesIds: PropTypes.array.isRequired
}

export default function User({ location }) {
  const { id } = QueryString.parse(location.search)
  const { user, loading, error } = useFetch(fetchUser, [id], [id], 'user')

  if (loading) {
    return <Loading text="Fetching user" />
  }
  if (error) {
    return <p className="center-text error">error</p>
  }

  return (
    <React.Fragment>
      <UserProfile user={user} />
      {user.submitted && (
        <UserStories storiesIds={user.submitted} />
      )}
    </React.Fragment>
  )
}
