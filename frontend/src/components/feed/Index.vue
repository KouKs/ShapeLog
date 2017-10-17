<template>
  <layout-master>
    <main class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-3-desktop is-12-tablet">
            <side-menu />
          </div>

          <div class="column is-9-desktop is-12-tablet">
            <record />
          </div>
        </div>
      </div>
    </main>
  </layout-master>
</template>

<script>
import Record from './Record'
import SideMenu from './SideMenu'
import LayoutMaster from '@/components/layouts/Master'

export default {
  components: { Record, SideMenu, LayoutMaster },

  mounted () {
    //
  }
}
</script>
