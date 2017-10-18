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

  static all () {
    return this.q.get()
  }

  static find (id) {
    return this.q.where({ id }).first()
  }

  static create (data) {
    return this.q.insert(data)
  }

  update (data) {
    return this.constructor.q.where({ id: this.id }).update(data)
  }

  delete () {
    return this.constructor.q.where({ id: this.id }).delete()
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
