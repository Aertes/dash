import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/layout'
import LoginIndex from '@/components/login/index'
import Upload from '@/components/upload/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: LoginIndex
    },
    {
      path: '/dashborad',
      name: 'dashborad',
      component: Layout
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    }

  ]
})
