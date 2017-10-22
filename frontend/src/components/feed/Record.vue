<template>
  <div class="card mb-1">
    <div
      class="template-filled"
      :style="{ background: record.background, color: record.text}"
      v-show="JSON.parse(record.template_data).length"
    >
      <div
        class="template-filled-row"
        v-for="row in JSON.parse(record.template_data)"
      >
        <div>{{ row.label }}</div>
        <div>{{ row.value }} {{ row.unit || '' }}</div>
      </div>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="record.user.avatar" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ record.user.first_name }} {{ record.user.last_name }}</p>
          <p class="subtitle is-6">
            <router-link :to="`/@${record.user.username}`">@{{ record.user.username }}</router-link>
          </p>
        </div>
        <div class="media-actions is-pulled-right" v-show="record.user.id === $user.id">
          <span class="icon">
            <i class="fa fa-times" aria-hidden="true" @click="deleteRecord(record.id)"></i>
          </span>
        </div>
      </div>

      <div class="content">
        {{ record.description }}
        <br>
        <small>
          <span class="icon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
          <time :datetime="record.created_at">{{ parsedDate }}</time>
        </small>
      </div>
    </div>

    <comments :record="record"/>
  </div>
</template>

<script>
import Comments from './Comments'
import { mapActions } from 'vuex'
import { parseDate } from '@/helpers'

export default {
  props: ['record'],

  components: { Comments },

  computed: {
    parsedDate () {
      return parseDate(this.record.created_at)
    }
  },

  methods: {
    ...mapActions('records', {
      deleteRecord: 'delete'
    })
  }
}
</script>
