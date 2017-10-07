export default class Controller {
  setValidator (validator) {
    this.validator = validator
  }

  validate (req, res) {
    return (new this.validator).passes(req, res)
  }
}
