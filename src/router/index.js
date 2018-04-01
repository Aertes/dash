import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/layout'
import LoginIndex from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginIndex
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Layout
    }
  ]
})
