import Vue from 'vue'
import Vuex from 'vuex'
import users from './resources/Users'
import records from './resources/Records'
import comments from './resources/Comments'
import templates from './resources/Templates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    templates, records, users, comments
  }
})
