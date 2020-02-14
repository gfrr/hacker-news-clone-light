function fetchStoriesIds(type = 'top') {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)
    .then(res => res.json())
    .then(stories => stories.slice(0,50))
}

function fetchItem(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(res => res.json())
}

export function fetchStories(type = 'top') {
  return fetchStoriesIds(type)
    .then(ids => ids.map(id => fetchItem(id)))
    .then(items => Promise.all(items).then(results => results.filter(result => Boolean(result))))
}

export function fetchUser(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
    .then(res => res.json())
}