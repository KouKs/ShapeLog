export default class HasMany {
  constructor (originalModelInstance, relatedModel) {
    this.originalModelInstance = originalModelInstance
    this.relatedModel = relatedModel
    this.relatedModelInstace = new relatedModel()

    return this.findRelatedRows()
  }

  findRelatedRows () {
    let query = {}
    query[this.foreignKey()] = this.originalModelInstance[this.originalModelInstance.key]

    return this.relatedModel.q.where(query)
  }

  foreignKey () {
    return `${this.singular(this.originalModelInstance.table)}_id`
  }

  singular(str) {
    return str.substr(0, str.length - 1)
  }
}
