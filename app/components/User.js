import React from 'react'
import QueryString from 'query-string'

import { useFetch } from '../hooks/useFetch'
import { fetchUser } from '../utils/api'

export default function User({ location }) {
  const { id } = QueryString.parse(location.search)
  const { user, loading, error } = useFetch(fetchUser, [id], [id], 'user')
  
  if (loading){
    return "loading."
  }
  if (error) {
    return "error"
  }

  return JSON.stringify(user, null, 2)
}