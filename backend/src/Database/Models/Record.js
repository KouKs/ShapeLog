import User from './User'
import Model from './Model'

export default class Record extends Model {
  get table () {
    return 'records'
  }

  get user () {
    return this.belongsTo(User)
  }
}
