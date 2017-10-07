import Builder from '../Query/Builder'
import HasMany from '../Relationships/HasMany'
import BelongsTo from '../Relationships/BelongsTo'

export default class Model {
  get key () {
    return 'id'
  }

  get fillable () {
    return []
  }

  static get q () {
    return new Builder(this)
  }

  static get query () {
    return new Builder(this)
  }

  belongsTo (model) {
    return new BelongsTo(model)
  }

  hasMany (model) {
    return new HasMany(model)
  }

  static all (callback) {
    return this.q.get(callback)
  }

  static find (id, callback) {
    return this.q.where({ id }).first(callback)
  }

  static newInstance () {
    return new this()
  }

  hydrate (data) {
    for (let key in data) {
      this[key] = data[key]
    }
    return this
  }
}
