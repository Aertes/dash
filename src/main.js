// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Echarts from 'echarts'
import Axios from 'axios'
import SvgIcon from '@/components/base/svgicon'
import Selection from '@/components/base/selection'
import './assets/font/iconfont'
import './assets/style/base.styl'
import 'amfe-flexible/index.min'

Vue.prototype.$echarts = Echarts
Vue.prototype.$http = Axios
Vue.config.productionTip = false

Vue.component('SvgIcon',SvgIcon)
Vue.component('Selection',Selection)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
