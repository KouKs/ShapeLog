import _ from 'lodash'
import axios from 'axios'
import config from 'config'

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
      load ({ commit }) {
        axios.get(`${config.api.url}`)
          .then(response => commit('updateResources', response))
      }
    }
  }

  static get mutations () {
    return {
      updateResources (state, payload) {
        state.resources = payload.data
      },

      removeResource (state, payload) {
        state.resources = state.resource.filter(resource => resource.id !== payload.id)
      }
    }
  }

  static get getters () {
    return {
      find: (state, getters) => (id) => {
        return state.resources.find(resource => resource.id === id)
      }
    }
  }

  static get state () {
    return {
      resourceName: this.resourceName,
      resources: []
    }
  }
}
