<template>
  <div class="app-main-wrap">

    <div class="options-bar box-shadow clearfix">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>
      <selection :selections="selectOptionsOne"></selection>
      <selection :selections="selectOptionsTwo"></selection>
      <selection :selections="selectOptionsThree"></selection>
      <selection :selections="selectOptionsFour"></selection>
      <div class="options-menu">
        <div @click="showOperation">
          <svg-icon sign="icon-more"></svg-icon>
        </div>
        <div class="dashboard-operation box-shadow" v-show="isShow">
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <!--<router-link to="javacs">
              <svg-icon sign="icon-upload" class="upload-icon"></svg-icon>
              <span>Upload .COM.COM.COM.COM</span></router-link>
            <router-link to="/">
              <svg-icon sign="icon-upload" class="upload-icon"></svg-icon>
              <span>Upload .COM.CN</span></router-link>-->
            <a href="javascript:;" v-for="(item,index) in menuList" @click="openUpload(item.link, item.type, item.tableSearch, item.tableDel, item.tableDownload)">
              <svg-icon sign="icon-upload" class="upload-icon"></svg-icon>
              <span>{{item.name}}</span>
            </a>
            <router-link to="/">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>system setting</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix dashboard-all-wrap">
      <time-line></time-line>
      <dash-board></dash-board>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import DashBoard from '../dashboard/dashboard'
  import TimeLine from '../timeline/timeline'
  import xhrUrls from '../../assets/config/xhrUrls'

  export default {
    name: "appmain",
    data() {
      return {
        isShow: false,
        selectOptionsOne: [
          {
            label: 'WEWWQWE',
            value: 0
          },
          {
            label: 'DFSASDAS',
            value: 1
          },
          {
            label: 'XCXZVASD',
            value: 2
          }
        ],
        selectOptionsTwo: [
          {
            label: 'JKLJJKGH',
            value: 0
          },
          {
            label: 'ZXCVVBDF',
            value: 1
          },
          {
            label: 'TGBCEDFS',
            value: 2
          }
        ],
        selectOptionsThree: [
          {
            label: 'WXASDEWF',
            value: 0
          },
          {
            label: 'RFVDCXERT',
            value: 1
          },
          {
            label: 'CVFSDRES',
            value: 2
          }
        ],
        selectOptionsFour: [
          {
            label: '2018/12',
            value: 0
          },
          {
            label: '2018/11',
            value: 1
          },
          {
            label: '2018/10',
            value: 2
          }
        ],
        menuList: [
          {
            name: 'CAMPAIGN',
            link: BASE_URL+xhrUrls.CMA_UPLOAD,
            type: 'Campaign',
            tableSearch:  BASE_URL+xhrUrls.HC_SEARCH,
            tableDel:  BASE_URL+xhrUrls.HC_DELETE,
            tableDownload: BASE_URL+xhrUrls.HC_DOWNLOAD,
          },
          {
            name: 'COM.CN',
            link: BASE_URL+xhrUrls.COM_UPLOAD,
            type: 'Com',
            tableSearch:  BASE_URL+xhrUrls.HC_SEARCH,
            tableDel:  BASE_URL+xhrUrls.HC_DELETE,
            tableDownload: BASE_URL+xhrUrls.HC_DOWNLOAD,
          },
          {
            name: 'CRM',
            link: BASE_URL+xhrUrls.CRM_UPLOAD,
            type: 'Crm',
            tableSearch:  BASE_URL+xhrUrls.HC_SEARCH,
            tableDel:  BASE_URL+xhrUrls.HC_DELETE,
            tableDownload: BASE_URL+xhrUrls.HC_DOWNLOAD,
          },
          {
            name: 'RATING & REVIEW',
            link: BASE_URL+xhrUrls.RV_UPLOAD,
            type: 'ReviewRating',
            tableSearch:  BASE_URL+xhrUrls.HC_SEARCH,
            tableDel:  BASE_URL+xhrUrls.HC_DELETE,
            tableDownload: BASE_URL+xhrUrls.HC_DOWNLOAD,
          },
          {
            name: 'EC REPORT',
            link: BASE_URL+xhrUrls.EC_UPLOAD,
            type: 'Ec',
            tableSearch:  BASE_URL+xhrUrls.HC_SEARCH,
            tableDel:  BASE_URL+xhrUrls.HC_DELETE,
            tableDownload: BASE_URL+xhrUrls.HC_DOWNLOAD,
          }
        ]
      }
    },
    methods: {
      showOperation() {
        this.isShow = !this.isShow
      },
      openUpload(link, type) {
        this.$emit('showUpload',{id:'upLoadBox',link:link, type:type, tableSearch:tableSearch, tableDel:tableDel, tableDownload:tableDownload})
        this.isShow = false
      }
    },
    components: {
      DashBoard,
      TimeLine
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .app-main-wrap
    margin-left 315px
    .options-bar
      padding 20px 0
      border-radius 10px
      background-color #fff
      .options-icon-date
        font-size 22px
        color #A0A0A1
        float left
        margin 8px 18px 0 39px
      .options-menu
        position relative
        float right
        margin-right 25px
        .icon
          font-size 35px
          color #2061AE
          cursor pointer
        .dashboard-operation
          position absolute
          right -24px
          top 60px
          line-height 60px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 9999
          .a-wrap
            border-radius 10px
            overflow hidden
          a
            display block
            padding 0 25px
            border-bottom 1px solid #E8E9E9
            &:last-of-type
              border-bottom medium
            &:hover
              background-color #fff
          .icon
            font-size 27px
            color #2061AE
          .upload-icon
            font-size 32px
          span
            margin-left 15px
            font-size 20px
            color #A0A0A1
            vertical-align middle
          .triangle
            position absolute
            top -15px
            right 20px
            width 44px
            height 15px
      .dropdown-wrap
        margin-right 80px
        float left
      .styleone
        width 380px
    .dashboard-all-wrap
      margin-top 25px
</style>
