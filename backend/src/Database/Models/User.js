import Model from './Model'
import Template from './Template'

export default class User extends Model {
  get table () {
    return 'users'
  }

  get templates () {
    return this.hasMany(Template)
  }
}
