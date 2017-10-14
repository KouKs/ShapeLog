import cors from 'cors'
import http from 'http'
import express from 'express'
import Kernel from '@/Http/Kernel'
import bodyParser from 'body-parser'

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
app.server.listen(3001)

/*
|
| We craft the application to handle the requests and send responses.
|
*/

Kernel.boot(app)
