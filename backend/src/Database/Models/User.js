import Record from './Record'
import Template from './Template'
import Model from '@/Database/Model'

export default class User extends Model {
  static get table () {
    return 'users'
  }

  static get relationMappings () {
    return {
      records: {
        relation: Model.HasManyRelation,
        modelClass: Record,
        join: {
          from: 'users.id',
          to: 'records.user_id'
        }
      },
      templates: {
        relation: Model.HasManyRelation,
        modelClass: Template,
        join: {
          from: 'users.id',
          to: 'templates.user_id'
        }
      }
    }
  }
}
