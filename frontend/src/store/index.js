import Vue from 'vue'
import Vuex from 'vuex'
import templates from './resources/Templates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    templates
  }
})
