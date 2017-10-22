import Route from '@/Http/Route'
import Authed from '@/Http/Middleware/Authed'
import UserController from '@/Http/Controllers/UserController'
import RecordController from '@/Http/Controllers/RecordController'
import AuthController from '@/Http/Controllers/Auth/AuthController'
import CommentController from '@/Http/Controllers/CommentController'
import TemplateController from '@/Http/Controllers/TemplateController'

export default [

  /*
  |
  | Application routes.
  |
  */

  Route.group({ middleware: Authed }, () => [
    Route.get('user', (req, res) => res.send(req.user)),

    Route.resource('template', TemplateController),
    Route.resource('record', RecordController),
    Route.resource('comment', CommentController),

    Route.get('users', [UserController, 'index']),
    Route.get('users/:user', [UserController, 'show'])
  ]),

  /*
  |
  | Auth routes.
  |
  */

  Route.get('auth/:provider', [AuthController, 'redirect']),
  Route.get('auth/:provider/callback', [AuthController, 'callback'])

  /*
  |
  | Test routes.
  |
  */

  //
]
