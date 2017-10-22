import ResourceStore from '@/store/ResourceStore'

export default ResourceStore.craft('records', {
  getters: {
    forUser: (state) => (id) => {
      return state.resources.filter(record => record.user_id === id)
    }
  }
})
