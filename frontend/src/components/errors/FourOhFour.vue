<template>
  <layout-empty>
    404
  </layout-empty>
</template>

<script>
import resource from '@/mixins/resource'
import LayoutEmpty from '@/components/layouts/Empty'

export default {
  components: { LayoutEmpty },

  mixins: [resource('tests')],

  mounted () {
    //
  }
}
</script>
