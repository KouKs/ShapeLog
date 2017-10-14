<template>
  <div>
    {{ allTests }}
    {{ testErrors }}
    {{ testHasErrors }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      findTest: 'tests/find', allTests: 'tests/all', testErrors: 'tests/errors', testHasErrors: 'tests/hasErrors'
    })
  },

  mounted () {
    // this.loadTests()

    this.storeTest({ name: 'asaasdasdd' })
  },

  methods: {
    ...mapActions({
      loadTests: 'tests/load', storeTest: 'tests/store', deleteTest: 'tests/delete', updateTest: 'tests/update'
    })
  }
}
</script>
