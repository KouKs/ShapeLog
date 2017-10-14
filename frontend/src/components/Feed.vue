<template>
  <div>
    <!-- {{ findTest(1) }} -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    findTest: 'tests/find'
  }),

  mounted () {
    console.log(this.$store.dispatch('tests/load'))
    console.log(this.$store.state)
  }
}
</script>
