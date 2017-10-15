<template>
  <div class="app">
    <navbar />

    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <side-menu />
        </div>

        <div class="column is-9">
          <breadcrumbs />

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/partials/Navbar'
import SideMenu from '@/components/partials/SideMenu'
import Breadcrumbs from '@/components/partials/Breadcrumbs'

export default {
  components: { Navbar, SideMenu, Breadcrumbs }
}
</script>

<style lang="sass">
  @import "../../assets/app";
</style>

