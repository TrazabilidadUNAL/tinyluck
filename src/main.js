// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueScrollTo from 'vue-scrollto'
import {sync} from 'vuex-router-sync'

import App from './App'

import router from './router/index'
import store from './store/index'

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  onDone: false,
  onCancel: false
})

Vue.use(VueAxios, axios)
sync(store, router)

Vue.config.productionTip = false
Vue.axios.defaults.headers.common['Authorization'] = `Token token=${localStorage.getItem('token')}`

let apiVersion = 'v1'

switch (process.env.NODE_ENV) {
  case 'development':
    Vue.axios.defaults.baseURL = `http://localhost:3000/${apiVersion}`
    break
  case 'production':
    Vue.axios.defaults.baseURL = `https://gretelapp.herokuapp.com/${apiVersion}`
    break
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
