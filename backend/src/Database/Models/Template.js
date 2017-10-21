import User from './User'
import TemplateRow from './TemplateRow'
import Model from '@/Database/Model'

export default class Template extends Model {
  static get table () {
    return 'templates'
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'templates.user_id',
          to: 'users.id'
        }
      },
      rows: {
        relation: Model.HasManyRelation,
        modelClass: TemplateRow,
        join: {
          from: 'templates.id',
          to: 'template_rows.template_id'
        }
      }
    }
  }
}
