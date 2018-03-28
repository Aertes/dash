<template>
  <div class="app-main-wrap">

    <div class="options-bar box-shadow clearfix">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>
      <selection></selection>
      <selection></selection>
      <selection></selection>
      <div class="options-menu">
        <div @click="showOperation"><svg-icon sign="icon-more"></svg-icon></div>
        <div class="dashboard-operation box-shadow" v-show="isShow">
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <router-link to="/">
              <svg-icon sign="icon-upload" class="upload-icon"></svg-icon>
              <span>Upload .COM.COM.COM.COM</span></router-link>
            <router-link to="/">
              <svg-icon sign="icon-upload" class="upload-icon"></svg-icon>
              <span>Upload .COM.CN</span></router-link>
            <router-link to="/">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>system setting</span></router-link>
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

  export default {
    name: "appmain",
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      showOperation() {
        this.isShow = !this.isShow
      }
    },
    components:{
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
            &:nth-of-type(2)
              border-top 1px solid #E8E9E9
              border-bottom 1px solid #E8E9E9
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
      .styleone
          width 380px
    .dashboard-all-wrap
      margin-top 25px
</style>
