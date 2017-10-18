import Route from '@/Http/Route'
import Authed from '@/Http/Middleware/Authed'
import AuthController from '@/Http/Controllers/Auth/AuthController'
import TemplateController from '@/Http/Controllers/TemplateController'
import RecordController from '@/Http/Controllers/RecordController'

export default [

  /*
  |
  | Application routes.
  |
  */

  Route.group({ middleware: Authed }, () => [
    Route.get('user', (req, res) => res.send(req.user)),

    Route.get('templates/rows', [TemplateController, 'rows']),
    Route.resource('template', TemplateController),

    Route.resource('record', RecordController)
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

]
