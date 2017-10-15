export default class Controller {
  setValidator (Validator) {
    this.Validator = Validator
  }

  validate (req, res) {
    return (new this.Validator()).passes(req, res)
  }
}
