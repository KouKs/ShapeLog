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

  /**
   * The validation error messages.
   *
   * @var Object
   */
  get messages () {
    return {
      name: { min: 'Min 6', max: 'Max 10' }
    }
  }
}
