import Relationship from './Relationship'

export default class HasMany extends Relationship {
  findRelatedRows () {
    let query = {}
    query[this.foreignKey()] = this.originalModelInstance[this.originalModelInstance.key]

    return this.RelatedModel.q.where(query)
  }

  foreignKey () {
    return `${this.singular(this.originalModelInstance.table)}_id`
  }
}
