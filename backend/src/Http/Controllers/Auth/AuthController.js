import config from 'config'
import passport from 'passport'
import User from '@/Database/Models/User'
import { generateApiToken } from '@/helpers'
import Controller from '@/Http/Controllers/Controller'

export default class AuthController extends Controller {
  redirect (req, res, next) {
    passport.authenticate(req.params.provider, { scope: 'email' })(req, res, next)
  }

  callback (req, res, next) {
    passport.authenticate(req.params.provider, (err, user) => {
      if (err) {
        return res.redirect(config.client.location)
      }

      return this.craftUser(user, res)
    })(req, res, next)
  }

  craftUser (socialUser, res) {
    User.q.where({ provider_id: socialUser.id }).first((user) => {
      if (!user) {
        User.create({
          provider_id: socialUser.id,
          username: this.getUsername(socialUser.displayName),
          full_name: socialUser.displayName,
          api_token: generateApiToken(60)
        })
      }

      return this.sendResponse(user.api_token, res)
    })
  }

  sendResponse (apiToken, res) {
    res.redirect(`${config.client.location}/#/auth/callback?api_token=${apiToken}`)
  }

  getUsername (fullName) {
    return fullName.toLowerCase().replace(' ', '.')
  }

  generateApiToken () {
    return Math.floor(Math.random() * Math.pow(10, 60))
  }
}
