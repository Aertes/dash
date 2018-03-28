<template>
  <div class="dropdown-wrap" :class="className">
    <div class="dropdown-show"  @click="toggleDrop">
      <input type="text" value="WEEK" disabled/>
      <svg-icon sign="icon-arrow-down" class="arrow-down"></svg-icon>
    </div>
    <ul class="dropdown-menu" v-show="isShow">
      <li>WEEK</li>
      <li>WEEK</li>
      <li>WEEK</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "selection",
    data() {
      return {
        isShow: false
      }
    },
    prop:{
      className: {
        type: String,
        default: ''
      }
    },
    method: {
      toggleDrop() {
        this.isShow = !this.isShow
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .dropdown-wrap
    position relative
    float left
    width 240px
    margin-right 80px
    .dropdown-show
      position relative
      width 100%
      height 35px
      .arrow-down
        position absolute
        top 12px
        right 10px
        font-size 13px
        color #A0A0A1
      input
        width 100%
        height 100%
        padding-left 10px
        appearance: none
        border 1px solid #E2DFDE
        border-radius 5px
        color #A0A0A1
        font-size 16px
        cursor pointer
        &:disabled
          background-color #fff
    .dropdown-menu
      position absolute
      top 37px
      width 100%
      font-size 15px
      color #A0A0A1
      line-height 35px
      background-color #fff
      border 1px solid #E2DFDE
      border-radius 5px
      li
        padding-left 10px
        border-bottom 1px solid #eaeaea
        cursor pointer
        &:last-of-type
          border-bottom medium
        &:hover
          background-color #F5F6F8
</style>
