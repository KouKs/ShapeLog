<template>
  <layout-master>
    <profile-header :user="user" :records="recordsForUser(user.id)"/>

    <main class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-3-desktop is-offset-1-desktop is-12-tablet">
            <templates v-show="user.id === $user.id" />

            <div class="box">
              <strong>Joined: </strong> {{ joined }}
            </div>
          </div>

          <div class="column is-7-desktop is-12-tablet">
            <record
              v-for="record in recordsForUser(user.id)"
              :key="record.id"
              :record="record"
            ></record>
          </div>
        </div>
      </div>
    </main>
  </layout-master>
</template>

<script>
import Templates from './Templates'
import ProfileHeader from './Header'
import { parseDate } from '@/helpers'
import Record from '@/components/feed/Record'
import { mapActions, mapGetters } from 'vuex'
import LayoutMaster from '@/components/layouts/Master'

export default {
  components: { Record, Templates, ProfileHeader, LayoutMaster },

  computed: {
    ...mapGetters('records', {
      recordsForUser: 'forUser'
    }),

    ...mapGetters('users', {
      userByUsername: 'byUsername'
    }),

    user () {
      return this.userByUsername(this.$route.params.user)
    },

    joined () {
      return parseDate(this.user.created_at)
    }
  },

  mounted () {
    this.loadUsers()

    this.loadRecords()
  },

  methods: {
    ...mapActions('records', {
      loadRecords: 'load'
    }),

    ...mapActions('users', {
      loadUsers: 'load'
    })
  }
}
</script>
