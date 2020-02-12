function getStoriesIds(type = 'top') {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)
    .then(res => res.json())
    .then(stories => stories.slice(0,50))
}

function getItem(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(res => res.json())
}

export function getStories(type = 'top') {
  return getStoriesIds(type)
    .then(ids => ids.map(id => getItem(id)))
    .then(items => Promise.all(items).then(results => results.filter(result => Boolean(result))))
}