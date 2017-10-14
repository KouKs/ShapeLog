import _ from 'lodash'
import axios from 'axios'
import { api } from '@/helpers'

export default class ResourceStore {
  static craft (name, store) {
    this.resourceName = name
    this.store = store || {}

    return {
      namespaced: true,
      actions: _.merge(this.actions, this.store.actions),
      getters: _.merge(this.getters, this.store.getters),
      mutations: _.merge(this.mutations, this.store.mutations),
      state: _.merge(this.state, this.store.state)
    }
  }

  static get actions () {
    return {
      load ({ commit, state }) {
        axios.get(api(state.resourceName))
          .then(response => commit('updateResources', response))
      },

      store ({ dispatch, commit, state }, data) {
        axios.post(api(state.resourceName), data)
          .then(response => dispatch('load'))
          .catch(({ response }) => commit('setErrors', response))
      },

      update ({ dispatch, commit, state }, resource, data) {
        axios.put(api(`${state.resourceName}/${resource.id}`), data)
          .then(response => dispatch('load'))
          .catch(({ response }) => commit('setErrors', response))
      },

      delete ({ dispatch, commit, state }, resource) {
        axios.delete(api(`${state.resourceName}/${resource.id}`))
          .then(response => dispatch('load'))
      }
    }
  }

  static get mutations () {
    return {
      updateResources (state, payload) {
        state.resources = payload.data
      },

      setErrors (state, payload) {
        state.errors = payload.data.errors
      }
    }
  }

  static get getters () {
    return {
      find: (state, getters) => (id) => {
        return state.resources.find(resource => resource.id === id)
      },

      all: (state, getters) => {
        return state.resources
      },

      errors: (state, getters) => {
        return state.errors
      },

      hasErrors: (state, getters) => {
        return Boolean(Object.keys(getters.errors).length)
      }
    }
  }

  static get state () {
    return {
      resourceName: this.resourceName,
      resources: [],
      errors: {}
    }
  }
}
