import User from '@/Database/Models/User'

export default class Authed {
  /**
   * Handles the incoming request.
   *
   * @param  Request  req
   * @param  Response res
   * @param  Closure  next
   * @return Closure
   */
  handle (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'Invalid API Token.' })
    }

    let token = req.headers.authorization.split(' ')[1]

    User.q.where({ api_token: token }).first()
      .then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'Invalid API Token.' })
        }

        req.user = user

        next()
      })
  }
}
