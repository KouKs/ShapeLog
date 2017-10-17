import User from './User'
import Model from './Model'
import TemplateRow from './TemplateRow'

export default class Template extends Model {
  get table () {
    return 'templates'
  }

  get user () {
    return this.belongsTo(User)
  }

  get rows () {
    return this.hasMany(TemplateRow)
  }
}
