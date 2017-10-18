<template>
  <layout-master>
    <profile-header />

    <main class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-3-desktop is-offset-1-desktop is-12-tablet">
            <templates />
          </div>

          <div class="column is-7-desktop is-12-tablet">
            ...
          </div>
        </div>
      </div>
    </main>
  </layout-master>
</template>

<script>
import Record from '@/components/feed/Record'
import Templates from './Templates'
import ProfileHeader from './Header'
import LayoutMaster from '@/components/layouts/Master'

export default {
  components: { Record, Templates, ProfileHeader, LayoutMaster },

  mounted () {
    //
  }
}
</script>
