import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Auth from '@/plugins/Auth'
import routes from '@/router/routes'
import App from '@/components/layouts/App'

Vue.use(Auth)
Vue.use(Router)

export default new Vue({
  el: '#app',
  components: { App },
  router: new Router({ routes }),
  store,
  template: '<App/>'
})
