import User from './User'
import Model from './Model'

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
