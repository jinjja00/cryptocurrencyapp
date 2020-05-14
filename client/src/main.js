// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'
import vuetify from '@/plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'


Vue.config.productionTip = false

sync(store, router)

Vue.component('apexchart', VueApexCharts)
Vue.use(require('vue-moment'))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
