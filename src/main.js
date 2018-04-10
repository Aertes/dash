// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

//字体模块
import SvgIcon from '@/components/base/svgicon'

Vue.component('SvgIcon', SvgIcon)

//select模块
import Selection from '@/components/base/selection'

Vue.component('Selection', Selection)

//svg字体配置(Js)
import './assets/font/iconfont'

//网站基础样式
import './assets/style/base.styl'

//网站自适应JS库
import 'amfe-flexible/index'

//优化滚动条
//import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min'
//import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
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

//图表
import Echarts from 'echarts'

Vue.prototype.$echarts = Echarts

//http异步
//import Axios from 'axios'
//Axios.defaults.withCredentials=true;
//Vue.prototype.$http = Axios
import {get, post, uploadPost} from './assets/config/http'

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$uploadPost = uploadPost

//非父子组件通信中转站
let Hub = new Vue();
Vue.prototype.$Hub = Hub

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    type: 0,
    year: null,
    month: null,

    camOneCategory:null,
    camCategory:null,
    camCompaign:null,
    camWeek:null,
    comMarketType:'B2C',
    rrOneChannel:null,
    rrChannel:null,
    ecCategory:null,


    camOneCategoryId:0,
    camCategoryId:0,
    camCompaignId:0,
    camWeekId:0,
    comMarketTypeId:0,
    rrOneChannelId:0,
    rrChannelId:0,
    ecCategoryId:0
  },
  mutations: {
    increment: state => {
      if (state.type == 11) return
      state.type++
    },
    decrement: state => {
      if (state.type == 0) return
      state.type--
    },
    voluation: (state, val) => {
      state.type = val
    },
    yearVoluation: (state, val) => {
      state.year = val
    },
    monthVoluation: (state, val) => {
      state.month = val
    },

    camOneCategoryVoluation:(state, val) => {
      if(val == 'All') val =null
      state.camOneCategory = val
    },
    camCategoryVoluation:(state, val) => {
      if(val == 'All') val =null
      state.camCategory = val
    },
    camCompaignVoluation:(state, val) => {
      if(val == 'All') val =null
      state.camCompaign = val
    },
    camWeekVoluation:(state, val) => {
      if(val == 'All') val =null
      state.camWeek = val
    },
    comMarketTypeVoluation:(state, val) => {
      state.comMarketType = val
    },
    rrOneChannelVoluation:(state, val) => {
      if(val == 'All') val =null
      state.rrOneChannel = val
    },
    rrChannelVoluation:(state, val) => {
      if(val == 'All') val =null
      state.rrChannel = val
    },
    ecCategoryVoluation:(state, val) => {
      if(val == 'All') val =null
      state.ecCategory = val
    },





    camOneCategoryIdVoluation:(state, val) => {
      state.camOneCategoryId = val
    },
    camCategoryIdVoluation:(state, val) => {
      state.camCategoryId = val
    },
    camCompaignIdVoluation:(state, val) => {
      state.camCompaignId = val
    },
    camWeekIdVoluation:(state, val) => {
      state.camWeekId = val
    },
    comMarketTypeIdVoluation:(state, val) => {
      state.comMarketTypeId = val
    },
    rrOneChannelIdVoluation:(state, val) => {
      state.rrOneChannelId = val
    },
    rrChannelIdVoluation:(state, val) => {
      state.rrChannelId = val
    },
    ecCategoryIdVoluation:(state, val) => {
      state.ecCategoryId = val
    }

  },
  getters: {
    getYearMonth: state => {
      if (state.year == null && state.month == null) {

        state.year = new Date().getFullYear().toString()

        state.month = (new Date().getMonth() + 1).toString()

      }

      if (state.month < 10) {

        return state.year + '0' + state.month

      } else {

        return state.year.toString() + state.month.toString()

      }
    }
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

