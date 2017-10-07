import Route from './Http/Route'

import TestController from './Http/Controllers/TestController'

export default [

  /*
  |
  | All application routes are being handled here.
  |
  */

  Route.resource('test', TestController)

]
