import Validator from './Validator'

export default class TemplateValidator extends Validator {
  /**
   * The validation rules.
   *
   * @var Object
   */
  get rules () {
    return {
      'text': 'min:1'
    }
  }
}
