import Cookie from 'js-cookie'
import { api } from '@/helpers'

class Auth {
  constructor (Vue) {
    this.Vue = Vue

    this.setAuthorizationHeader()
  }

  token () {
    return Cookie.get('api_token')
  }

  login (token) {
    Cookie.set('api_token', token)

    this.setAuthorizationHeader()
  }

  logout () {
    Cookie.remove('api_token')
  }

  user () {
    return new Promise((resolve, reject) => {
      this.Vue.axios.get(api('user'))
        .then(response => resolve(response.data))
        .catch(({ response }) => reject(response))
    })
  }

  setAuthorizationHeader () {
    this.Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookie.get('api_token')
  }
}

export default {
  install (Vue) {
    Vue.prototype.$auth = new Auth(Vue)
  }
}
