import Model from './Model'
import Record from './Record'
import Template from './Template'

export default class User extends Model {
  get table () {
    return 'users'
  }

  get templates () {
    return this.hasMany(Template)
  }

  get records () {
    return this.hasMany(Record)
  }
}
