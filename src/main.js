import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import routers from './router'
import './plugins/element.js'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(Router)

Vue.prototype.$http = axios

Vue.config.productionTip = false

const router = new Router ({
  mode: 'history',
  routes: routers
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
