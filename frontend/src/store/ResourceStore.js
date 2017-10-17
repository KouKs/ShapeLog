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
        return Vue.axios.get(api(state.resourceName))
          .then(response => commit('updateResources', response))
      },

      store ({ dispatch, commit, state }, data) {
        commit('clearErrors')

        return Vue.axios.post(api(state.resourceName), data)
          .then(response => dispatch('load'))
          .catch(({ response }) => commit('setErrors', response))
      },

      update ({ dispatch, commit, state }, id, data) {
        commit('clearErrors')

        return Vue.axios.put(api(`${state.resourceName}/${id}`), data)
          .then(response => dispatch('load'))
          .catch(({ response }) => commit('setErrors', response))
      },

      delete ({ dispatch, commit, state }, id) {
        return Vue.axios.delete(api(`${state.resourceName}/${id}`))
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
      },

      clearErrors (state) {
        state.errors = {}
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

      hasErrors: (state) => (field = false) => {
        if (field) {
          return Boolean(state.errors[field].length)
        }

        return Boolean(Object.keys(state.errors).filter((field) => {
          return state.errors[field].length > 0
        }).length)
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
