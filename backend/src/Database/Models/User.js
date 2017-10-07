import Model from './Model'

export default class User extends Model {
  get table () {
    return 'users'
  }

  get fillable () {
    return ['name']
  }
}
