<template>
  <div class="footer-wrapper">
      <p>@2014-2016 philips eletronics n.v all rights reserved 沪icp 09062110号</p>
      <p>公安备案号：沪公网安备31010602001824号</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Footer"
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.footer-wrapper 
  position fixed
  bottom 20px
  text-align center
  left 50%
  transform translateX(-50%)
  color #a0a0a1
  p
    padding 5px 0
    margin-bottom 0

</style>

