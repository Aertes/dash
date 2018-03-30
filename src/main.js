// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Echarts from 'echarts'
import Axios from 'axios'

//字体模块
import SvgIcon from '@/components/base/svgicon'
//select模块
import Selection from '@/components/base/selection'

//字体文件
import './assets/font/iconfont'
//基础样式
import './assets/style/base.styl'

//网站自适应
import 'amfe-flexible/index'

//优化滚动条
//import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
//import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min'
//import './assets/style/scrollbar.css'

//table分页条
import "./assets/style/tablepagination.css"

//弹出框
import './assets/layer/theme/default/layer.css'
import './assets/layer/layer'

/*upload*/ 
// import vueUploadWeb from 'vue-upload-web'


// import './assets/js/upload/Uploader.swf'
// import './assets/js/upload/webuploader.min'

Vue.prototype.$echarts = Echarts
Vue.prototype.$http = Axios
Axios.defaults.withCredentials=true;
Vue.config.productionTip = false

Vue.component('SvgIcon',SvgIcon)
Vue.component('Selection',Selection)

//非父子组件通信中转站
let Hub = new Vue();
Vue.prototype.$Hub = Hub

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
