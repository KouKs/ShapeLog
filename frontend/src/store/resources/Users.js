import ResourceStore from '@/store/ResourceStore'

export default ResourceStore.craft('users', {
  getters: {
    byUsername: (state) => (username) => {
      return state.resources.find(user => user.username === username)
    }
  }
})
