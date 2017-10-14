import Route from './Route'

import Feed from '@/components/Feed'
import Middleware from '@/router/Middleware/Middleware'

export default [

  /*
  |
  | All application routes are defined here.
  |
  */

  Route.set('/', Feed).name('menu').middleware(Middleware).get()

]
