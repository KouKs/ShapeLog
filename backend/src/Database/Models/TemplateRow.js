import Template from './Template'
import Model from '@/Database/Model'

export default class TemplateRow extends Model {
  static get table () {
    return 'template_rows'
  }

  static get relationMappings () {
    return {
      template: {
        relation: Model.BelongsToOneRelation,
        modelClass: Template,
        join: {
          from: 'template_rows.template_id',
          to: 'templates.id'
        }
      }
    }
  }
}
