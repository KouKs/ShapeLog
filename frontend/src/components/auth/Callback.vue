<template>
  <layout-empty>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <i class="fa fa-spinner fa-spin fa-5x"></i>
        </div>
      </div>
    </section>
  </layout-empty>
</template>

<script>
import LayoutEmpty from '@/components/layouts/Empty'

export default {
  components: { LayoutEmpty },

  mounted () {
    this.$auth.login(
      this.$route.query.api_token
    )

    this.$router.push({ name: 'home' })
  }
}
</script>
