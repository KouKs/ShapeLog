import User from './User'
import Model from '@/Database/Model'

export default class Record extends Model {
  static get table () {
    return 'records'
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'records.user_id',
          to: 'users.id'
        }
      }
    }
  }
}
