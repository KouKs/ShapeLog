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
    updateResources (state, payload) {
      state.resources = payload.data.map(template => _.merge(template, { rows: [] }))
    },

    assignRows (state, payload) {
      let rows = payload.data.map(row => _.merge(row, { data: JSON.parse(row.data) }))

      state.resources = state.resources.map((template) => {
        return _.merge(template, {
          rows: rows.filter(row => row.template_id === template.id)
        })
      })
    }
  }
})
