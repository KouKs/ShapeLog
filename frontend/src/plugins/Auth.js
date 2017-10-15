import Cookie from 'js-cookie'
import { api } from '@/helpers'

class Auth {
  constructor (Vue) {
    this.Vue = Vue
  }

  login (token) {
    Cookie.set('api_token', token)
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
}

export default {
  install (Vue) {
    Vue.prototype.$auth = new Auth(Vue)
  }
}
