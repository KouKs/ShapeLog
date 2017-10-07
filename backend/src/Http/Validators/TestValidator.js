import Validator from './Validator'

export default class TestValidator extends Validator {
  get rules () {
    return {
      name: 'min:3'
    }
  }

  get messages () {
    return {
      name: 'The name has to be at least 3 characters long.'
    }
  }
}
