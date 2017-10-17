import Route from './Route'
import Feed from '@/components/feed/Index'
import Login from '@/components/auth/Login'
import Guest from '@/router/Middleware/Guest'
import Authed from '@/router/Middleware/Authed'
import Profile from '@/components/profile/Index'
import Callback from '@/components/auth/Callback'
import FourOhFour from '@/components/errors/FourOhFour'

export default [

  /*
  |
  | Applicaiton routes.
  |
  */

  Route.set('/', Feed).name('home').middleware(Authed).get(),
  Route.set('/@:user', Profile).name('profile').middleware(Authed).get(),

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
