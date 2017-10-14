export default class Relationship {
  constructor (originalModelInstance, RelatedModel) {
    this.originalModelInstance = originalModelInstance
    this.RelatedModel = RelatedModel
    this.relatedModelInstace = new RelatedModel()

    return this.findRelatedRows()
  }

  singular (str) {
    return str.substr(0, str.length - 1)
  }
}
