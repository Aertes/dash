<template>
  <div class="nav-bar-wrap clearfix">
    <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></div>
    <h1>One China Digital Performance Dashboard</h1>
    <div class="user-info">
      <div class="after-login">
        <div class="userHover" v-if="USERINFO">
          <span class="user-name">{{userName}}</span>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
        </div>
        <div class="userHover" v-else @click="showOperation"> 
          <span class="user-name">{{userName}}</span>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
        </div>
        <div v-if="USERINFO"  class="user-operation box-shadow" >
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <router-link to="/">
              <svg-icon sign="icon-user"></svg-icon>
              <span>PROFILE</span></router-link>
            <router-link to="/">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>SYSTEM SETTINGS</span></router-link>
            <a @click="outLogin">
              <svg-icon sign="icon-turn-off"></svg-icon>
              <span>SIGN OUT</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSessionItem} from "../../assets/config/storage.js"
  import {removeSessionItem} from "../../assets/config/storage.js"
  import {get} from "../../assets/config/http"
  import xhrUrls from '../../assets/config/xhrUrls'

  export default {
    name: "NavBar",
    data() {
      return {
        isShow: false,
        userName: 'Login',
        USERINFO: null,
      }
    },
    methods: {
      showOperation() {
        if (!this.USERINFO) {
          this.$router.push({path: "/"});
        }
      },
      outLogin() {
        get(xhrUrls.LOGOUT).then((res) => {
          this.USERINFO = removeSessionItem('USERINFO')
          this.$router.push({path: "/"});
        }).catch((err) => {
          console.log(err);
        })

      }
    },
    mounted() {
      const USERINFO = JSON.parse(getSessionItem('USERINFO'))
      this.USERINFO = USERINFO
      try {
        this.userName = USERINFO.name;
      } catch (ex) {
        //console.error('报错: ', ex.message)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .nav-bar-wrap
    margin-bottom 19px
    line-height 100px
    .logo
      float left
      width 198px
      height 100px
      // margin-left 45px
      img
        width 100%
        height 100%
    h1
      float left
      margin-left 60px
      font-size 37px
      color #a0a0a1
      font-weight normal
      text-shadow: 5px 5px 5px #bbbbbb;
    .user-info
      float right
      color #2061AE
      .before-login
        font-size 33px
      .after-login
        position relative
        cursor pointer
        &:hover .user-operation
          display block
        .user-name
          margin-right 24px
          font-size 27px
          vertical-align top
        .user-icon
          font-size 27px
        .user-operation
          position absolute
          right -24px
          top 100px
          line-height 60px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 99999
          display none
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
