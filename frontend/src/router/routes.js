import Route from './Route'

import Feed from '@/components/Feed'

export default [

  /*
  |
  | All application routes are defined here.
  |
  */

  Route.set('/', Feed).name('menu').get()

]
