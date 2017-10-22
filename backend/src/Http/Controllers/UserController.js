import Controller from './Controller'
import User from '@/Database/Models/User'

export default class TemplateController extends Controller {
  /**
   * Returns a collection of the resource.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  index (req, res) {
    User.q.then((users) => {
      res.send(users)
    })
  }

  /**
   * Shows a single record of the resource.
   *
   * @param  Request  req
   * @param  Response res
   * @return void
   */
  show (req, res) {
    User.q.where('username', req.params.user).first()
      .then((user) => {
        res.send(user)
      })
  }
}
