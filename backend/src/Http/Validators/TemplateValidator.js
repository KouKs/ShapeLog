import Validator from './Validator'

export default class TemplateValidator extends Validator {
  /**
   * The validation rules.
   *
   * @var Object
   */
  get rules () {
    return {
      'name': 'min:3',
      'text': 'min:4|max:7',
      'background': 'min:4|max:7'
    }
  }
}
