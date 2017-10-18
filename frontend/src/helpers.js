import config from 'config'

export function api (url) {
  return `${config.api.url}/${url || ''}`
}

export function trimSlashes (str) {
  return str.replace(/^\/?([a-z]+)\/?$/, '$1')
}

export function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function singular (str) {
  return str.slice(0, str.length - 1)
}

export function parseDate (str) {
  let date = new Date(str)

  return `${date.getDate()}. ${date.getMonth()}. ${date.getHours()}:${date.getMinutes()}`
}
