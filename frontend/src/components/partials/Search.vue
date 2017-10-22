<template>
  <div class="navbar-item">
    <input class="input" style="width: 400px" placeholder="Search" v-model="pattern">

    <div ref="results" :class="['navbar-dropdown', navbarClass]">
      <router-link
        class="navbar-item"
        v-for="user in filteredUsers"
        :to="`/@${user.username}`"
        :key="user.id"
        @click="pattern = ''"
      >
        <figure class="image is-24x24">
          <img :src="user.avatar" class="is-round">
        </figure>
        &nbsp;
        {{ user.first_name }} {{ user.last_name }} <small class="has-text-grey">&nbsp;@{{ user.username }}</small>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      pattern: ''
    }
  },

  computed: {
    ...mapGetters('users', {
      allUsers: 'all'
    }),

    filteredUsers () {
      return this.allUsers.filter((user) => {
        return user.first_name.match(this.pattern) ||
         user.last_name.match(this.pattern) ||
         user.username.match(this.pattern)
      })
    },

    navbarClass () {
      return this.pattern.length > 0 && this.filteredUsers.length > 0 ? 'is-active' : ''
    }
  },

  mounted () {
    this.loadUsers()
  },

  methods: {
    ...mapActions('users', {
      loadUsers: 'load'
    })
  }
}
</script>
