import Vue from 'vue'

export default class Guest {
  /**
   * Handles the incoming request.
   *
   * @param  Object to
   * @param  Object from
   * @param  Closure next
   * @return Response
   */
  handle (to, from, next) {
    if (Vue.prototype.$auth.token()) {
      return next({ name: 'home' })
    }

    return next()
  }
}
