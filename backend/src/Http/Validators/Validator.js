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
    this.definedRules = {}

    this.registerRules().forEach((rule) => {
      let [name, callback] = rule.resolve()

      this.definedRules[name] = callback
    })
  }

  validateRules (req) {
    this.errors = {}

    return !Object.keys(this.rules).filter((field) => {
      this.errors[field] = []

      return Boolean(this.rules[field].split('|').filter((rule) => {
        return this.validateEachRule(req, field, rule)
      }).length)
    }).length
  }

  validateEachRule (req, field, rule) {
    let [name, args] = rule.split(':')

    if (this.definedRules[name](req.body[field] || '', ...args.split(','))) {
      return false
    }

    this.errors[field].push(this.messages[field][name])

    return true
  }
}
