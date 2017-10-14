import Vue from 'vue'
import Vuex from 'vuex'
import tests from './resources/Tests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tests
  }
})
