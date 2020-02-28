import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/views/Homepage'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
