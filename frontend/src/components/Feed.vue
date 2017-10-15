<template>
  <layout-master>
    <div>
      {{ allTests }}
      {{ testErrors }}
    </div>
  </layout-master>
</template>

<script>
import resource from '@/mixins/resource'
import LayoutMaster from '@/components/layouts/Master'

export default {
  components: { LayoutMaster },

  mixins: [resource('tests')],

  mounted () {
    console.log(this.$user)
  }
}
</script>
