export default class Validator {
  passes (req, res) {
    this.resolveRules()

    if (!this.validateRules(req)) {
      this.reject(res)

      return false
    }

    return true
  }

  reject (res) {
    res.status(422).send({ errors: this.errors })
  }

  registerRules () {
    return require('./Rules').default
  }

  resolveRules () {
    this.definedRules = {};

    this.registerRules().forEach((rule) => {
      let [name, callback] = rule.resolve()

      this.definedRules[name] = callback
    })
  }

  validateRules (req) {
    this.errors = {}

    return !Boolean(Object.keys(this.rules).filter((rule) => {
      let [name, args] = this.rules[rule].split(':')

      if (this.definedRules[name](req.body[rule], ... args.split(','))) {
        return false
      }

      this.errors[rule] = this.messages[rule]

      return true
    }).length)
  }
}
