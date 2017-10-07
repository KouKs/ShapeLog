import http from 'http'
import express from 'express'
import config from '../config'
import Kernel from './Http/Kernel'
import bodyParser from 'body-parser'
import Connection from './Database/Connection'

/*
|
| We boot up the http server and listed on a given port.
|
*/

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.server = http.createServer(app)
app.server.listen(8080)

/*
|
| We craft the application to handle the requests and send responses.
|
*/

Kernel.boot(app)
