import Model from './Model'
import Template from './Template'

export default class TemplateRow extends Model {
  get table () {
    return 'template_rows'
  }

  get template () {
    return this.belongsTo(Template)
  }
}
