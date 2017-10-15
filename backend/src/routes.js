import Route from '@/Http/Route'
import Authed from '@/Http/Middleware/Authed'
import TestValidator from '@/Http/Validators/TestValidator'
import AuthController from '@/Http/Controllers/Auth/AuthController'

export default [

  /*
  |
  | Application routes.
  |
  */

  Route.get('user', (req, res) => {
    res.send(req.user)
  }).middleware(Authed),

  /*
  |
  | Auth routes.
  |
  */

  Route.get('auth/:provider', [AuthController, 'redirect']),
  Route.get('auth/:provider/callback', [AuthController, 'callback']),

  /*
  |
  | Test routes.
  |
  */

  Route.get('tests', (req, res) => {
    res.send([
      { id: 1, name: 'asdf' },
      { id: 2, name: 'asdfasdasd' }
    ])
  }),

  Route.post('tests', (req, res) => {
    if (!(new TestValidator()).passes(req, res)) {
      return
    }

    res.send([
      { id: 1, name: 'asdf' },
      { id: 2, name: 'asdfasdasd' }
    ])
  })

]
