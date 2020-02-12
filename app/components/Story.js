import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ThemeContext from '../contexts/theme'

export default function Story({ title, url, user, time, comments, id, isHeader }) {
  const theme = React.useContext(ThemeContext)
  const link = <a className="link" href={url}>{title}</a>

  return (
    <React.Fragment>
      {isHeader
        ? <h1>{link}</h1>
        : link}
      <div className={`meta-info ${theme}`}>
        <span>by <Link to={`/user?id=${user}`}>{user}</Link></span>
        <span>on {time.toLocaleString()}</span>
        <span>with <Link to={`/post?id=${id}`}>{comments}</Link> comments</span>
      </div>
    </React.Fragment>
  )
}

Story.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isHeader: PropTypes.bool
}