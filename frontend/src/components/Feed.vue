<template>
  <div>
    {{ allTests }}
    {{ testErrors }}
  </div>
</template>

<script>
import resource from '@/mixins/resource'

export default {
  mixins: [resource('tests')],

  mounted () {
    this.loadTests()

    console.log(this.$auth)

    // this.storeTest({ name: 'asaasdasdasdsasdd' })
  }
}
</script>
