// import config from 'config'

export default class SetHeaders {
  /**
   * Handles the incoming request.
   *
   * @param  Request  req
   * @param  Response res
   * @param  Closure  next
   * @return Closure
   */
  handle (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')

    return next()
  }
}
