import { env } from '@/helpers'

export default {
  facebook: {
    clientID: env('FB_APP_ID'),
    clientSecret: env('FB_APP_SECRET'),
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
}
