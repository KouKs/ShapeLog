import { Model as AbstractModel } from 'objection'

export default class Model extends AbstractModel {
  static get q () {
    return this.query()
  }

  static get tableName () {
    return this.table
  }
}
