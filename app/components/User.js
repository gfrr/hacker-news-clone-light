import React from 'react'
import QueryString from 'query-string'
import PropTypes from 'prop-types'

import ThemeContext from '../contexts/theme'
import { useFetch } from '../hooks/useFetch'
import { fetchUser } from '../utils/api'
import Loading from './Loading'

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
      {JSON.stringify(user.submitted, null, 2)}
    </React.Fragment>
  )
}