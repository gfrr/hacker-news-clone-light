function fetchStoriesIds(type = 'top') {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)
    .then(res => res.json())
}

export function fetchItem(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(res => res.json())
}

export function fetchPopularStories(type = 'top') {
  return fetchStoriesIds(type)
    .then(ids => fetchItems(ids))
    .then(items => items)
}

export function fetchUser(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
    .then(res => res.json())
}

export function fetchItems(ids, filterFn, limit = 50) {
  const requestIds = ids.slice(0, limit)
  const items = requestIds.map(id => fetchItem(id))
  return Promise.all(items).then(results => results.filter(filterFn ? filterFn : Boolean))
}
