<template>
  <layout-master>
    <main class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-offset-1-desktop is-3-desktop is-12-tablet">
            <side-menu />
          </div>

          <div class="column is-7-desktop is-12-tablet">
            <textarea
              class="textarea new-record-trigger"
              rows="3"
              placeholder="Post New Record..."
              @focus="toggleModal()"
            ></textarea>

            <record-form
              :active="modalActive"
              :form="formData"
              :errors="recordErrors"
              @close="toggleModal()"
              @submit="(data) => { save(data) }"
            />

            <hr>

            <record v-for="record in allRecords" :key="record.id" :record="record"/>
          </div>
        </div>
      </div>
    </main>
  </layout-master>
</template>

<script>
import Record from './Record'
import SideMenu from './SideMenu'
import { mapActions, mapGetters } from 'vuex'
import RecordForm from '@/components/forms/Record'
import LayoutMaster from '@/components/layouts/Master'

export default {
  components: { RecordForm, Record, SideMenu, LayoutMaster },

  data () {
    return {
      formData: { },
      modalActive: false
    }
  },

  computed: {
    ...mapGetters('records', {
      allRecords: 'all',
      recordErrors: 'errors',
      recordHasErrors: 'hasErrors'
    })
  },

  mounted () {
    this.loadRecords()
  },

  methods: {
    ...mapActions('records', {
      loadRecords: 'load',
      storeRecord: 'store'
    }),

    toggleModal () {
      this.modalActive = !this.modalActive
    },

    save (data) {
      this.storeRecord(data)
        .then(() => {
          if (!this.recordHasErrors()) {
            this.resetFormData()

            this.toggleModal()
          }
        })
    },

    resetFormData () {
      this.formData = { }
    }
  }
}
</script>
