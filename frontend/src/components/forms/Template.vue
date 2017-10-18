<template>
  <form :class="['modal', activeClass]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <input type="text" class="input is-fading" v-model="form.name" placeholder="Template Name">
        </p>
        <span class="delete" aria-label="close" @click="$emit('close')"></span>
      </header>

      <section class="modal-card-body section">
        <div class="split">
          <ul class="split-menu">
            <li class="menu-label">Presets</li>
<!--             <li @click="addRow('bmr')">BMR</li>
            <li @click="addRow('bmi')">BMI</li> -->
            <li @click="addRow('label-value')">Label - Value</li>
            <hr class="divider"></hr>
            <li class="menu-label">Colors</li>
            <li class="menu-label">
              <span
                v-for="color in colorPresets"
                :class="['color-sample', form.background === color.background ? 'selected' : '']"
                :style="{ background: color.background }"
                @click="form.background = color.background; form.text = color.text"
              ></span>
            </li>
          </ul>

          <div class="split-body">
            <draggable :list="form.rows">
              <template-row
                v-for="row in form.rows"
                :key="row.id"
                :row="row"
                @remove="(row) => { removeRow(row) }"
              ></template-row>
            </draggable>

            <p
              v-show="form.rows.length === 0"
              class="split-empty"
            >Choose a preset from the menu.</p>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-primary" @click.prevent="$emit('submit', form)">Save</button>
        <button class="button" @click.prevent="$emit('close')">Cancel</button>
      </footer>
    </div>
  </form>
</template>

<script>
import Draggable from 'vuedraggable'
import TemplateRow from './TemplateRow'

export default {
  components: { Draggable, TemplateRow },

  props: {
    active: Boolean,
    errors: Object,
    form: Object
  },

  data () {
    return {
      colorPresets: [
        { background: '#b23432', text: '#fff' },
        { background: '#00d1b2', text: '#fff' },
        { background: '#fff', text: '#000' }
      ]
    }
  },

  computed: {
    activeClass () {
      return this.active ? 'is-active' : ''
    }
  },

  methods: {
    removeRow (row) {
      this.form.rows = this.form.rows.filter(item => row.id !== item.id)
    },

    addRow (type) {
      this.form.rows.push({ id: this.form.rows.length, type, data: {} })
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-sample {
    border-radius: 3px;
    border: 3px solid whitesmoke;
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    cursor: pointer;
    display: inline-block;
    height: 40px;
    margin-bottom: 5px;
    margin-right: 5px;
    width: 40px;

    &.selected, &:hover {
      border: none
    }
  }
</style>
