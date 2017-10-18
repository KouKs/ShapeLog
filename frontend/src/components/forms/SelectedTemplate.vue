<template>
  <div class="template-filling" :style="{ background: template.background, color: template.text }">
    <div class="template-filling-row" v-for="row in template.rows">
      <div>{{ row.data.label }}</div>
      <div class="field has-addons">
        <p class="control">
          <input
            class="input"
            type="text"
            placeholder="Value"
            v-model="templateData[row.data.label]"
            @keyup="$emit('change', templateData)"
          >
        </p>
        <p class="control">
          <a class="button is-static">
            {{ row.data.unit }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['template', 'templateData']
}
</script>

