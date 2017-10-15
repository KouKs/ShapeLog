import _ from 'lodash'
import Vue from 'vue'
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
        Vue.axios.get(api(state.resourceName))
          .then(response => commit('updateResources', response))
      },

      store ({ dispatch, commit, state }, data) {
        Vue.axios.post(api(state.resourceName), data)
          .then(response => dispatch('load'))
          .catch(({ response }) => commit('setErrors', response))
      },

      update ({ dispatch, commit, state }, resource, data) {
        Vue.axios.put(api(`${state.resourceName}/${resource.id}`), data)
          .then(response => dispatch('load'))
          .catch(({ response }) => commit('setErrors', response))
      },

      delete ({ dispatch, commit, state }, resource) {
        Vue.axios.delete(api(`${state.resourceName}/${resource.id}`))
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
      find: (state) => (id) => {
        return state.resources.find(resource => resource.id === id)
      },

      all: (state) => {
        return state.resources
      },

      errors: (state) => {
        return state.errors
      },

      hasErrors: (state) => (field) => {
        return Boolean(state.errors[field].length)
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
