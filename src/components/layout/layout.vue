<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <div class="clear">
      <side-bar></side-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import NavBar from '../navbar/navbar'
  import SideBar from '../sidebar/sidebar'
  import AppMain from '../appmain/appmain'

  export default ({
    components: {
      NavBar,
      SideBar,
      AppMain
    }
  })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .app-wrapper
    position relative
    margin 0 39px
    height 100%
</style>
