import config from 'config'

export function api (url) {
  return `${config.api.url}/${url || ''}`
}
