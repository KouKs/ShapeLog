<template>
  <aside class="panel">
    <p class="panel-heading">
      Templates
    </p>

    <a class="panel-block" v-for="template in allTemplates">
      {{ template.name }}
    </a>

    <div class="panel-block">
      <button class="button is-primary is-outlined is-fullwidth" @click="formActive = true">
        Create New Template
      </button>
    </div>

    <template-form
      :active="formActive"
      :errors="templateErrors"
      :form="formData"
      @close="formActive = false"
      @save="(data) => { submitForm(data) }"
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
      formActive: false,
      formData: {}
    }
  },

  computed: {
    ...mapGetters('templates', {
      allTemplates: 'all',
      rowsForTemplate: 'rowsForTemplate',
      templateHasErrors: 'hasErrors',
      templateErrors: 'errors'
    })
  },

  mounted () {
    this.resetFormData()

    this.loadTemplates()
      .then(() => this.loadTemplateRows())
  },

  methods: {
    ...mapActions('templates', {
      loadTemplates: 'load',
      storeTemplate: 'store',
      updateTemplate: 'update',
      loadTemplateRows: 'loadTemplateRows'
    }),

    submitForm (data) {
      this.storeTemplate(data)
        .then(() => {
          if (!this.templateHasErrors()) {
            this.formActive = false
            this.resetFormData()
          }
        })
    },

    resetFormData () {
      this.formData = { rows: [], background: '#b23432', text: '#fff' }
    }
  }
}
</script>
