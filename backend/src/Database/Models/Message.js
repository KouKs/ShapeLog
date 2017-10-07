import Model from './Model'
import User from './User'

export default class Message extends Model {
  get table () {
    return 'messages'
  }

  get fillable () {
    return ['name']
  }

  get user () {
    return this.belongsTo(User)
  }
}
