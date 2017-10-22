import Record from './Record'
import Comment from './Comment'
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
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'users.id',
          to: 'comments.user_id'
        }
      }
    }
  }
}
