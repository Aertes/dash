<template>
  <ul class="side-bar-wrap box-shadow">
    <li class="active">OVERVIEW</li>
    <li>CAMPAIGN</li>
    <li>COM.CN</li>
    <li>CRM</li>
    <li>RATING & REVIEW</li>
    <li>EC REPORT</li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "sidebar"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .side-bar-wrap
    position absolute
    top 142px
    bottom 0
    left 0
    width 280px
    float left
    line-height 120px
    background #2F7BC0
    background linear-gradient(to bottom, #2061AE, #2F81C4)
    border-radius 10px 10px 0 0
    text-align center
    overflow hidden
    color #fff
    font-size 24px
    li
      cursor pointer
      background url("../../assets/img/sidebarBg.png") no-repeat left bottom
      &.active
        background url("../../assets/img/sidebarBg_active.png") no-repeat center
</style>
