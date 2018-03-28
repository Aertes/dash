import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/layout'
import Login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Login
    },
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Layout
    // }

  ]
})
