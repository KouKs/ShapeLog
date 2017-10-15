import Route from './Route'
import Feed from '@/components/Feed'
import Login from '@/components/auth/Login'
import Callback from '@/components/auth/Callback'
import Authed from '@/router/Middleware/Authed'

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

  Route.set('/auth/login', Login).name('login').get(),
  Route.set('/auth/callback', Callback).name('callback').get()

]
