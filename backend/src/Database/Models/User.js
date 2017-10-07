import Model from './Model'
import Message from './Message'

export default class User extends Model {
  get table () {
    return 'users'
  }

  get fillable () {
    return ['name']
  }

  get messages () {
    return this.hasMany(Message)
  }
}
