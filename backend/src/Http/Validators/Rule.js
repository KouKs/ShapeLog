export default class Rule {
  constructor (name, callback) {
    this.name = name
    this.callback = callback
  }

  static make (name, callback) {
    return new this(name, callback)
  }

  resolve () {
    return [this.name, this.callback]
  }
}
