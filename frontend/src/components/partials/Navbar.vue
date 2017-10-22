<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">
          ShapeLog
        </router-link>
        <div class="navbar-burger burger" @click="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div :class="['navbar-menu', activeClass]">
        <div class="navbar-start">
          <search />
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/">Feed</router-link>
          <div class="navbar-item has-dropdown is-hoverable" to="/">
            <router-link class="navbar-item" :to="`/@${$user.username}`">
              <figure class="image is-24x24">
                <img :src="$user.avatar" :alt="$user.first_name" class="is-round">
              </figure>
              &nbsp;
              Profile
            </router-link>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Settings
              </a>
              <hr class="navbar-divider"></hr>
              <a class="navbar-item" @click="logout()">
                Logout
              </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Search from './Search'

export default {
  components: { Search },

  data () {
    return {
      activeClass: ''
    }
  },

  methods: {
    logout () {
      this.$auth.logout()
      this.$router.push({ name: 'login' })
    },

    toggleMenu () {
      this.activeClass = this.activeClass === '' ? 'is-active' : ''
    }
  }
}
</script>
