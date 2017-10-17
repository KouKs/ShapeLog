<template>
  <div class="app">
    <navbar />

    <slot />
  </div>
</template>

<script>
import Navbar from '@/components/partials/Navbar'

export default {
  components: { Navbar }
}
</script>

<style lang="sass">
  @import "../../assets/app";
</style>

