import Controller from './Controller'
import TestValidator from '../Validators/TestValidator'
import User from '../../Database/Models/User'

export default class TestController extends Controller {
  constructor () {
    super()

    this.setValidator(TestValidator)
  }

  index (req, res) {
    User.q.where({ id: 1, name: 'test' }).get((users) => {
      res.send({ data: users })
    })
  }

  store (req, res) {
    if (!this.validate(req, res)) {
      return
    }

    res.send('asd')
  }

  show () {}
  update () {}
  destroy () {}
}
