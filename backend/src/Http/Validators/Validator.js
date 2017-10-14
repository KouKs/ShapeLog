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
      let [name, callback, message] = rule.resolve()

      this.definedRules[name] = { callback, message }
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

    if (this.definedRules[name].callback(req.body[field] || '', ...args.split(','))) {
      return false
    }

    this.errors[field].push(this.parseErrorMessage(
      this.definedRules[name].message, field, args.split(',')
    ))

    return true
  }

  parseErrorMessage (msg, field, args) {
    msg = msg.replace(':field', field)

    args.forEach((arg, key) => {
      msg = msg.replace(`:${key + 1}`, arg)
    })

    return msg
  }
}
