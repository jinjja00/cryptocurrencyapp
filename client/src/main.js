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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['user/isAuthenticated']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (store.getters['user/isAuthenticated']) {
    next('/main') // make sure to always call next()!
  }
  else {
    next()
  }
})

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
