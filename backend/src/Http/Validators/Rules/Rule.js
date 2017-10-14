export default class Rule {
  constructor (name, callback, message) {
    this.name = name
    this.callback = callback
    this.message = message
  }

  static make (name, callback, message) {
    return new this(name, callback, message)
  }

  resolve () {
    return [this.name, this.callback, this.message]
  }
}
