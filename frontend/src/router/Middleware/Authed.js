import Vue from 'vue'

export default class Authed {
  /**
   * Handles the incoming request.
   *
   * @param  Object to
   * @param  Object from
   * @param  Closure next
   * @return Response
   */
  handle (to, from, next) {
    Vue.prototype.$auth.user()
      .then((user) => {
        if (!user) {
          return next({ name: 'login' })
        }

        Vue.prototype.$user = user

        return next()
      })
      .catch(() => {
        return next({ name: 'login' })
      })
  }
}
