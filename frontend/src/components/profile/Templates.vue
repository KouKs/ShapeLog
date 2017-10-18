<template>
  <aside class="panel">
    <p class="panel-heading">
      Templates
    </p>

    <a class="panel-block has-actions" v-for="template in allTemplates">
      <div class="template-name">
        {{ template.name }}
      </div>

      <div class="template-actions">
        <span class="icon">
          <i class="fa fa-edit" @click="toggleModal(template.id)"></i>
        </span>
        <span class="icon">
          <i class="fa fa-times" @click="deleteTemplate(template.id)"></i>
        </span>
      </div>

      <template-form
        :key="template.id"
        :active="modalActive(template.id)"
        :errors="templateErrors"
        :form="template"
        @close="toggleModal()"
        @submit="(data) => { update(data) }"
      ></template-form>
    </a>

    <div class="panel-block">
      <button class="button is-primary is-outlined is-fullwidth" @click="toggleModal('new')">
        Create New Template
      </button>
    </div>

    <template-form
      :key="'new'"
      :active="modalActive('new')"
      :errors="templateErrors"
      :form="formData"
      @close="toggleModal()"
      @submit="(data) => { save(data) }"
    ></template-form>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TemplateForm from '@/components/forms/Template'

export default {
  components: { TemplateForm },

  data () {
    return {
      formData: { rows: [], background: '#b23432', text: '#fff' },
      activeModal: 0
    }
  },

  computed: {
    ...mapGetters('templates', {
      allTemplates: 'all',
      templateErrors: 'errors',
      templateHasErrors: 'hasErrors'
    })
  },

  mounted () {
    this.loadTemplates()
      .then(() => this.loadTemplateRows())
  },

  methods: {
    ...mapActions('templates', {
      loadTemplates: 'load',
      storeTemplate: 'store',
      deleteTemplate: 'delete',
      updateTemplate: 'update',
      loadTemplateRows: 'loadTemplateRows'
    }),

    toggleModal (id = 0) {
      this.activeModal = id
    },

    modalActive (id) {
      return this.activeModal === id
    },

    resetFormData () {
      this.formData = { rows: [], background: '#b23432', text: '#fff' }
    },

    save (data) {
      this.storeTemplate(data)
        .then(() => {
          if (!this.templateHasErrors()) {
            this.finalizeRequest()
          }
        })
    },

    update (data) {
      this.updateTemplate(data)
        .then(() => {
          if (!this.templateHasErrors()) {
            this.finalizeRequest()
          }
        })
    },

    finalizeRequest () {
      this.toggleModal()

      this.resetFormData()

      this.loadTemplateRows()
    }
  }
}
</script>
