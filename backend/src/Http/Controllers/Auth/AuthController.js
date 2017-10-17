import config from 'config'
import Passport from 'passport'
import User from '@/Database/Models/User'
import { generateApiToken } from '@/helpers'
import Controller from '@/Http/Controllers/Controller'

export default class AuthController extends Controller {
  redirect (req, res, next) {
    Passport.authenticate(req.params.provider)(req, res, next)
  }

  callback (req, res, next) {
    Passport.authenticate(req.params.provider, (err, user) => {
      if (err) {
        return res.redirect(`${config.client.location}${config.client.loginUri}`)
      }

      return this.handleCallback(user, res)
    })(req, res, next)
  }

  handleCallback (socialUser, res) {
    User.q.where({ provider_id: socialUser.id }).first((user) => {
      if (!user) {
        return this.createUser(socialUser, res)
      }

      return this.sendResponse(user.api_token, res)
    })
  }

  createUser (socialUser, res) {
    User.create({
      provider_id: socialUser.id,
      username: this.getUsername(socialUser),
      first_name: socialUser.name.givenName,
      middle_name: socialUser.name.middleName,
      last_name: socialUser.name.familyName,
      avatar: socialUser.photos[0].value,
      api_token: generateApiToken(60)
    }, (user) => {
      return this.sendResponse(user.api_token, res)
    })
  }

  getUsername (user) {
    return user.name.givenName.toLowerCase() + '.' + user.name.familyName.toLowerCase()
  }

  generateApiToken () {
    return Math.floor(Math.random() * Math.pow(10, 60))
  }

  sendResponse (apiToken, res) {
    res.redirect(`${config.client.location}${config.client.callbackUri}?api_token=${apiToken}`)
  }
}
