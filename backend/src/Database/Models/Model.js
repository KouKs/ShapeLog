import Builder from '@/Database/Query/Builder'
import HasMany from '@/Database/Relationships/HasMany'
import BelongsTo from '@/Database/Relationships/BelongsTo'

export default class Model {
  get key () {
    return 'id'
  }

  get fillable () {
    return []
  }

  static get q () {
    return this.query
  }

  static get query () {
    return new Builder(this)
  }

  static all (callback) {
    return this.q.get(callback)
  }

  static find (id, callback) {
    return this.q.where({ id }).first(callback)
  }

  static create (data, callback) {
    return this.q.insert(data, callback)
  }

  update (data, callback) {
    return this.constructor.q.where({ id: this.id }).update(data, callback)
  }

  belongsTo (model) {
    return new BelongsTo(this, model)
  }

  hasMany (model) {
    return new HasMany(this, model)
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
