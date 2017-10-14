import Validator from './Validator'

export default class TestValidator extends Validator {
  /**
   * The validation rules.
   *
   * @var Object
   */
  get rules () {
    return {
      name: 'min:6|max:10'
    }
  }
}
