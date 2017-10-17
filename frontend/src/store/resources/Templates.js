import Vue from 'vue'
import _ from 'lodash'
import { api } from '@/helpers'
import ResourceStore from '@/store/ResourceStore'

export default ResourceStore.craft('templates', {
  actions: {
    loadTemplateRows ({ commit }) {
      Vue.axios.get(api('templates/rows'))
        .then(response => commit('assignRows', response))
    }
  },

  mutations: {
    assignRows (state, payload) {
      state.resources = state.resources.map((template) => {
        return _.merge(template, {
          rows: payload.data.filter(row => row.template_id === template.id)
        })
      })
    }
  }
})
