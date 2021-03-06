import DotEnv from 'dotenv'

DotEnv.config()

/**
 * Communication with the env file.
 *
 * @param   {string} key    The key to be returned
 * @param   {string} empty  The defualt value
 * @returns {string} value  The env value
 */
export function env (key, empty) {
  if (key in process.env) {
    return process.env[key]
  }

  if (empty !== undefined) {
    return empty
  }

  return ''
}

export function trimSlashes (str) {
  return str.replace(/^\/?(.+)\/?$/, '$1')
}

export function generateApiToken (length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
