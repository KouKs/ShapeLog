export default class Middleware {
  /**
   * Handles the incoming request.
   *
   * @param  Object to
   * @param  Object from
   * @param  Closure next
   * @return Response
   */
  handle (to, from, next) {
    //
    to.meta['user'] = 'asd'

    return next()
  }
}
