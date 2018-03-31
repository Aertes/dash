<template>
  <div class="nav-bar-wrap clearfix">
    <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="243" height="123"></div>
    <h1>One China Digital Performance</h1>
    <div class="user-info">
      <div class="after-login">
        <div @click="showOperation">
          <span class="user-name">John Doe</span>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
        </div>
        <div class="user-operation box-shadow" v-show="isShow">
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <router-link to="/">
              <svg-icon sign="icon-user"></svg-icon>
              <span>profile</span></router-link>
            <router-link to="/">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>system setting</span></router-link>
            <router-link to="/">
              <svg-icon sign="icon-turn-off"></svg-icon>
              <span>sign out</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "NavBar",
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      showOperation() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .nav-bar-wrap
    margin-bottom 19px
    line-height 123px
    .logo
      float left
      width 243px
      height 123px
      margin-left 20px
      img
        width 100%
        height 100%
    h1
      float left
      margin-left 60px
      font-size 37px
      color #a0a0a1
      font-weight normal
    .user-info
      float right
      color #2061AE
      .before-login
        font-size 33px
      .after-login
        position relative
        cursor pointer
        .user-name
          margin-right 24px
          font-size 33px
          vertical-align top
        .user-icon
          font-size 29px
        .user-operation
          position absolute
          right -24px
          top 100px
          line-height 60px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 99999
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
          span
            margin-left 15px
            font-size 20px
            color #A0A0A1
            vertical-align middle
          .triangle
            position absolute
            top -15px
            right 16px
            width 44px
            height 15px
</style>
