import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/views/Homepage'
import Register from '@/components/Register'
import Login from '@/views/Login'
import Mainpage from '@/views/Mainpage'
import CoinInformation from '@/views/CoinInformation'

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Mainpage',
      component: Mainpage
    },
    {
      path: '/coin/:id',
      name: 'CoinInformation',
      component: CoinInformation
    }
  ]
})
