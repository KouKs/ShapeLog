import { mapGetters, mapActions } from 'vuex'
import { capitalize, singular } from '@/helpers'

const getters = [
  { name: 'all', alias: name => `all${capitalize(name)}` },
  { name: 'find', alias: name => `find${capitalize(singular(name))}` },
  { name: 'errors', alias: name => `${singular(name)}Errors` },
  { name: 'hasErrors', alias: name => `${singular(name)}HasErrors` }
]

const actions = [
  { name: 'load', alias: name => `load${capitalize(name)}` },
  { name: 'store', alias: name => `store${capitalize(singular(name))}` },
  { name: 'update', alias: name => `update${capitalize(singular(name))}` },
  { name: 'delete', alias: name => `delete${capitalize(singular(name))}` }
]

export default (name) => {
  return {
    computed: mapGetters(name, getters.reduce((carry, getter) => {
      carry[getter.alias('tests')] = getter.name

      return carry
    }, {})),

    methods: mapActions(name, actions.reduce((carry, action) => {
      carry[action.alias('tests')] = action.name

      return carry
    }, {}))
  }
}
