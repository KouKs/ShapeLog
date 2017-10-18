<template>
  <div class="template-row">
    <header class="template-row-header">
      <span class="icon">
        <i class="fa fa-bars drag-icon" aria-hidden="true"></i>
      </span>
      <span class="icon is-pulled-right">
        <i class="fa fa-times" aria-hidden="true" @click="$emit('remove', row)"></i>
      </span>
    </header>

    <section class="template-row-body" v-if="row.type === 'label-value'">
      <input
        v-model="row.data.label"
        type="text"
        class="input is-fading"
        placeholder="Label"
      >
      <input
        v-model="row.data.unit"
        type="text"
        class="input is-fading"
        placeholder="Unit (optional)"
      >
    </section>

    <section class="template-row-body" v-else-if="row.type === 'bmi'">
      <p class="template-row-label">BMI</p>
      <p class="template-row-description">This preset automatically handles the body mass index calculation.</p>
    </section>

    <section class="template-row-body" v-else-if="row.type === 'bmr'">
      <p class="template-row-label">BMR</p>
      <p class="template-row-description">This preset automatically handles the basal metabolic rate calculation.</p>
    </section>
  </div>
</template>

<script>
export default {
  props: ['row']
}
</script>
