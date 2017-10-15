import cors from 'cors'
import http from 'http'
import config from 'config'
import express from 'express'
import Passport from 'passport'
import Kernel from '@/Http/Kernel'
import bodyParser from 'body-parser'
import FacebookStrategy from 'passport-facebook'

/*
|
| We boot up the http server and listed on a given port.
|
*/

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.server = http.createServer(app)
app.server.listen(3000)

/*
|
| Setup auth providers.
|
*/

Passport.use(new FacebookStrategy.Strategy(config.auth.facebook, (accessToken, refreshToken, user, done) => {
  done(null, user)
}))

/*
|
| We craft the application to handle the requests and send responses.
|
*/

Kernel.boot(app)
