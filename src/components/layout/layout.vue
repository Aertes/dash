<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <app-main></app-main>
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
    padding 0 39px
</style>
