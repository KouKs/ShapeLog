import Rule from './Rule'

export default [

  /*
  |
  | Validation rules are defined here.
  |
  */

  Rule.make('min', (str, min) => {
    return str.length >= min
  })

  Rule.make('max', (str, max) => {
    return str.length <= min
  })

]
