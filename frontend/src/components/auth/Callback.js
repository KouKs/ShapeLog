export default {
  template: 'Redirecting...',

  mounted () {
    this.$auth.login(
      this.$route.query.api_token
    )

    this.$router.push({ name: 'home' })
  }
}
