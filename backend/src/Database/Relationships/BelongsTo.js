import Relationship from './Relationship'

export default class BelongsTo extends Relationship {
  findRelatedRows () {
    let query = {}
    query[this.relatedModelInstace.key] = this.originalModelInstance[this.foreignKey()]

    return this.RelatedModel.q.where(query)
  }

  foreignKey () {
    return `${this.singular(this.relatedModelInstace.table)}_id`
  }
}
