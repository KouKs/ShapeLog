import Route from './Http/Route'

import User from './Database/Models/User'
import Message from './Database/Models/Message'

export default [

  /*
  |
  | All application routes are being handled here.
  |
  */

  Route.post('/', (req, res) => {
    Message.find(1, (message) => {
      message.user.first((user) => {
        console.log(user)
      })
    })


    res.send('Hello!')
  })

]
