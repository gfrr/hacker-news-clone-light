import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ThemeContext from '../contexts/theme'

export default function Story({ story, isHeader }) {
  const { title, by, url, descendants, id, time } = story
  const theme = React.useContext(ThemeContext)
  const text = url ? <a className="link">{title}</a> : <Link className="link" to={`/post?id=${id}`}>{title}</Link>
  const date = React.useMemo(() => new Date(time * 1000).toLocaleString(), [time])

  return (
    <React.Fragment>
      {isHeader
        ? <h1 className='header'>{text}</h1>
        : text}
      <div className={`meta-info ${theme}`}>
        <span>by <Link to={`/user?id=${by}`}>{by}</Link></span>
        <span>on {date}</span>
        <span>with <Link to={`/post?id=${id}`}>{descendants}</Link> comments</span>
      </div>
    </React.Fragment>
  )
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    descendants: PropTypes.number,
    url: PropTypes.string
  }).isRequired,
  isHeader: PropTypes.bool
}