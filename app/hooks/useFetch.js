import React from 'react'

const fetchReducer = (state, { type, message, data }) => {
  switch (type) {
    case 'loading':
      return {
        ...state,
        loading: true
      }
    case 'success':
      return {
        data,
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

/**
 * Hooks that takes care of fetching data
 * 
 * @param {Function} fetchFn - fetch function you wanna use
 * @param {Array} [fetchArgs] - fetch function Arguments
 * @param {Array} [watch] - variables you wanna watch
 * @param {String} [dataPropName] - prop name for the data you are fetching, defaults to 'data'
 */
export function useFetch(fetchFn, fetchArgs = [], watch = [], dataPropName = 'data') {
  const [{ data, loading, error }, dispatch] = React.useReducer(fetchReducer, {
    data: null,
    loading: true,
    error: null
  })

  React.useEffect(() => {
    dispatch({ type: 'loading' })
    fetchFn(...fetchArgs)
      .then(data => dispatch({ type: 'success', data }))
      .catch(({ message }) => dispatch({ type: 'error', message }))
  }, watch || [])

  return {
    [dataPropName]: data,
    loading,
    error
  }
}