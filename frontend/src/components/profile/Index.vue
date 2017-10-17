<template>
  <layout-master>
    <profile-header />

    <main class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <templates />
          </div>

          <div class="column is-9">
            .-
          </div>
        </div>
      </div>
    </main>
  </layout-master>
</template>

<script>
import Templates from './Templates'
import ProfileHeader from './Header'
import LayoutMaster from '@/components/layouts/Master'

export default {
  components: { Templates, ProfileHeader, LayoutMaster },

  mounted () {
    //
  }
}
</script>
