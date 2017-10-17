<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">
          ShapeLog
        </router-link>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Search
          </a>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/">Feed</router-link>
          <div class="navbar-item has-dropdown is-hoverable" to="/">
            <router-link class="navbar-item" :to="`/@${$user.username}`">
              <span class="img">
                <img :src="$user.avatar" :alt="$user.first_name">
              </span>
              Profile
            </router-link>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Settings
              </a>
              <hr class="navbar-divider"></hr>
              <a class="navbar-item">
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
export default {
  //
}
</script>
