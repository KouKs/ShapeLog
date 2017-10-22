<template>
  <section class="hero is-white is-medium">
    <div class="hero-body">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <img :src="user.avatar" class="is-round">

            <div class="pl-1">
              <p class="heading">@{{ user.username }}</p>
              <p class="title">{{ user.first_name }} {{ user.last_name }}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Recodrs</p>
              <p class="title">{{ records.length }}</p>
           </div>
          </div>

<!--           <div class="level-item has-text-centered">
            <div>
              <p class="heading">Followers</p>
              <p class="title">120</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Following</p>
              <p class="title">121</p>
            </div>
          </div> -->
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: Object,
    records: Array
  }
}
</script>
