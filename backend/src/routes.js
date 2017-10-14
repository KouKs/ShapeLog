import Route from '@/Http/Route'
import TestValidator from '@/Http/Validators/TestValidator'

export default [

  /*
  |
  | All application routes are being handled here.
  |
  */

  Route.get('tests', (req, res) => {
    res.send([
      { id: 1, name: 'asdf' },
      { id: 2, name: 'asdfasdasd' }
    ])
  }),

  Route.post('tests', (req, res) => {
    if (!(new TestValidator()).passes(req, res)) {
      return
    }

    res.send([
      { id: 1, name: 'asdf' },
      { id: 2, name: 'asdfasdasd' }
    ])
  })

]
