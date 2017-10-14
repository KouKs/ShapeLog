import Rule from './Rule'

export default [

  /*
  |
  | Validation rules are defined here.
  |
  */

  Rule.make('min', (str, min) => {
    return str.length >= min
  }, 'The :field field needs to be at least :1 characters long.'),

  Rule.make('max', (str, max) => {
    return str.length <= max
  }, 'The :field field needs to be up to :1 characters long.')

]
