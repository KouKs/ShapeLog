import Vue from 'vue'
import Vuex from 'vuex'
import records from './resources/Records'
import templates from './resources/Templates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    templates, records
  }
})
