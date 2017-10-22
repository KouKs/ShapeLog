<template>
  <div class="record-comments">
    <div class="comment" v-for="comment in record.comments">
      <figure class="image is-32x32">
        <img :src="comment.user.avatar" class="is-round">
      </figure>
      &nbsp;
      <p><router-link :to="`/@${comment.user.username}`">{{ comment.user.first_name }} {{ comment.user.last_name }}</router-link> {{ comment.text }}</p>
      <span class="icon is-pulled-right" v-show="$user.id === comment.user.id">
        <i class="fa fa-times" @click="remove(comment.id)"></i>
      </span>
    </div>
    <div class="comment">
      <figure class="image is-32x32">
        <img :src="$user.avatar" class="is-round">
      </figure>
      &nbsp;
      <form @submit.prevent="submitForm()" style="width: 100%">
        <input type="text" class="input" placeholder="Type a comment" v-model="form.text">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['record'],

  data () {
    return {
      form: {
        record_id: this.record.id
      }
    }
  },

  methods: {
    ...mapActions('comments', {
      storeComment: 'store',
      deleteComment: 'delete'
    }),
    ...mapActions('records', {
      loadRecords: 'load'
    }),

    remove (id) {
      this.deleteComment(id)
        .then(() => this.loadRecords())
    },

    submitForm () {
      this.storeComment(this.form)
        .then(() => {
          this.loadRecords()

          this.form = { record_id: this.record.id }
        })
    }
  }
}
</script>
