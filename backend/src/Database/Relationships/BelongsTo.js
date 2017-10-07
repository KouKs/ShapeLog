export default class BelongsTo {
  constructor (originalModelInstance, relatedModel) {
    this.originalModelInstance = originalModelInstance
    this.relatedModel = relatedModel
    this.relatedModelInstace = new relatedModel()

    return this.findRelatedRows()
  }

  findRelatedRows () {
    let query = {}
    query[this.relatedModelInstace.key] = this.originalModelInstance[this.foreignKey()]

    return this.relatedModel.q.where(query)
  }

  foreignKey () {
    return `${this.singular(this.relatedModelInstace.table)}_id`
  }

  singular(str) {
    return str.substr(0, str.length - 1)
  }
}
