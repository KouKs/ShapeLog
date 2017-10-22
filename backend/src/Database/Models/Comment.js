import User from './User'
import Record from './Record'
import Model from '@/Database/Model'

export default class Comment extends Model {
  static get table () {
    return 'comments'
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id'
        }
      },
      record: {
        relation: Model.BelongsToOneRelation,
        modelClass: Record,
        join: {
          from: 'comments.record_id',
          to: 'records.id'
        }
      }
    }
  }
}
