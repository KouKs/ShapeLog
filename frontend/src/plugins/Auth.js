class Auth {

}

export default {
  install (Vue) {
    Vue.prototype.$auth = new Auth()
  }
}
