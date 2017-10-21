<template>
  <form :class="['modal', activeClass]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Post New Record
        </p>
        <span class="delete" aria-label="close" @click="$emit('close')"></span>
      </header>

      <section class="modal-card-body section">
        <div class="split">
          <ul class="split-menu">
            <li class="menu-label">Templates</li>
            <li v-for="template in allTemplates" @click="selectTemplate(template)">{{ template.name }}</li>
            <hr class="divider"></hr>
            <li @click="selectTemplate(false)">No Template</li>
          </ul>

          <div class="split-body">
            <selected-template
              :template="selectedTemplate"
              :templateData="templateData"
              v-show="selectedTemplate"
              @change="(val) => { templateData = val }"
            ></selected-template>

            <textarea
              class="textarea plain"
              placeholder="Enter Record Description..."
              v-model="form.description"
            ></textarea>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-primary" @click.prevent="$emit('submit', transformedData)">Post</button>
        <button class="button" @click.prevent="$emit('close')">Cancel</button>
      </footer>
    </div>
  </form>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import SelectedTemplate from './SelectedTemplate'

export default {
  components: { SelectedTemplate },

  props: {
    active: Boolean,
    errors: Object,
    form: Object
  },

  data () {
    return {
      selectedTemplate: false,
      templateData: { }
    }
  },

  computed: {
    ...mapGetters('templates', {
      allTemplates: 'all'
    }),

    activeClass () {
      return this.active ? 'is-active' : ''
    },

    transformedData () {
      return _.merge(this.form, {
        text: this.selectedTemplate.text,
        background: this.selectedTemplate.background,
        template_data: Object.keys(this.templateData).map((key) => {
          return {
            label: key,
            value: this.templateData[key],
            unit: this.selectedTemplate.rows.find(row => row.data.label === key).data.unit
          }
        })
      })
    }
  },

  mounted () {
    this.loadTemplates()
  },

  methods: {
    ...mapActions('templates', {
      loadTemplates: 'load'
    }),

    selectTemplate (template) {
      this.selectedTemplate = template
    }
  }
}
</script>
