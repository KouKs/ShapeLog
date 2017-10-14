import Route from '@/Http/Route'

export default [

  /*
  |
  | All application routes are being handled here.
  |
  */

  Route.get('/', (req, res) => {
    res.send([
      { id: 1, name: 'asdf' },
      { id: 2, name: 'asdfasdasd' }
    ])
  })

]
