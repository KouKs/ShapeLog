<script>
export default {
  template: '<div>Redirecting...</div>',

  mounted () {
    this.$auth.login(
      this.$route.query.api_token
    )

    this.$router.push({ name: 'home' })
  }
}
</script>
