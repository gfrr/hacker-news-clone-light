import React from 'react'
import { Link } from 'react-router-dom'
import QueryString from 'query-string'
import PropTypes from 'prop-types'

import ThemeContext from '../contexts/theme'
import { useFetch } from '../hooks/useFetch'
import { fetchItem, fetchItems } from '../utils/api'
import Loading from './Loading'
import Story from './Story'

function Comment({ comment }) {
  const { by, time, text } = comment
  const theme = React.useContext(ThemeContext)
  const on = React.useMemo(() => new Date(time * 1000).toLocaleString(), [time])

  return (
    <div className="comment">
      <div className={`meta-info ${theme}`}>
        <span>by <Link to={`/user?id=${by}`}>{by}</Link></span>
        <span>on {on}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

const filter = (result) => result && result.type === 'comment'

function Comments({ commentsIds }) {
  const { comments, loading, error } = useFetch(fetchItems, [commentsIds, filter], [commentsIds], 'comments')

  if (loading) {
    return <Loading text="Fetching comments" />
  }
  if (error) {
    return <p className="center-text error">error</p>
  }

  return comments.length && (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  )
}

Comments.propTypes = {
  commentsIds: PropTypes.array.isRequired
}

export default function Post({ location }) {
  const { id } = QueryString.parse(location.search)
  const { post, loading, error } = useFetch(fetchItem, [id], [id], 'post')

  if (loading) {
    return <Loading text="Fetching post" />
  }
  if (error) {
    return <p className="center-text error">error</p>
  }

  return (
    <React.Fragment>
      <Story story={post} isHeader />
      {post.kids && (
        <Comments commentsIds={post.kids} />
      )}
    </React.Fragment>
  )
}
