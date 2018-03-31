<template>
  <div class="nav-bar-wrap clearfix">
    <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="243" height="123"></div>
    <h1>ONE CHINA DIGITAL PERFORMANCE</h1>
    <!-- <div class="user-info">
      <div class="after-login">
        <div @click="showOperation">
          <span class="user-name">Register</span>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Header",
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
    margin: 0 39px;
    // margin-bottom 19px
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
        
</style>
