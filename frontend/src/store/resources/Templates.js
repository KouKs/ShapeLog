import _ from 'lodash'
import ResourceStore from '@/store/ResourceStore'

export default ResourceStore.craft('templates', {
  mutations: {
    updateResources (state, payload) {
      state.resources = payload.data.map((template) => {
        return _.merge(template, { rows: template.rows.map((row) => {
          return _.merge(row, { data: JSON.parse(row.data) })
        })})
      })
    }
  }
})
