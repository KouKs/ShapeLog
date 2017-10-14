import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import routes from '@/router/routes'
import App from '@/components/layouts/App'

Vue.use(Router)

export default new Vue({
  el: '#app',
  components: { App },
  router: new Router({ routes }),
  store,
  template: '<App/>'
})
