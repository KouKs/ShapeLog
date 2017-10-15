import Route from './Route'
import Feed from '@/components/Feed'
import Login from '@/components/auth/Login'
import Authed from '@/router/Middleware/Authed'
import Guest from '@/router/Middleware/Guest'
import Callback from '@/components/auth/Callback'
import FourOhFour from '@/components/errors/FourOhFour'

export default [

  /*
  |
  | Applicaiton routes.
  |
  */

  Route.set('/', Feed).name('home').middleware(Authed).get(),

  /*
  |
  | Auth routes.
  |
  */

  Route.set('/auth/login', Login).name('login').middleware(Guest).get(),
  Route.set('/auth/callback', Callback).name('callback').middleware(Guest).get(),

  /*
  |
  | 404 Route.
  |
  */

  Route.set('*', FourOhFour).get()
]
