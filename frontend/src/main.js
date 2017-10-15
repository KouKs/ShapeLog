import Vue from 'vue'
import App from '@/App'
import axios from 'axios'
import store from '@/store'
import Router from 'vue-router'
import VueAxios from 'vue-axios'
import Auth from '@/plugins/Auth'
import routes from '@/router/routes'

/**
 * Register all Vue plugins.
 */

Vue.use(VueAxios, axios)
Vue.use(Auth)
Vue.use(Router)

/**
 * Create the main Vue instnace.
 */

export default new Vue({
  el: '#app',
  components: { App },
  router: new Router({ routes }),
  store,
  template: '<App/>'
})
