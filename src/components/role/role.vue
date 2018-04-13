<template>
  <div class="role-wrap">
    <form action="" class="clearfix search-wrap">
      <div class="search">
        <label for="userName">User Name</label>
        <input id="userName" type="text">
      </div>
      <div class="search">
        <label for="searchVal">Login Account</label>
        <input id="searchVal" type="text">
      </div>
      <div class="search">
        <label>Status</label>
        <selection :selections="selectStatusOptions" class="role-select"></selection>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "role",
    data() {
      return {
        selectStatusOptions: ['All', 'Enable', 'Disable'],
      }
    }
  }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .search-wrap
    width 100%
  .search
    float left
    .dropdown-wrap
      display inline-block
      width 200px
      height 40px
      line-height 40px
      .dropdown-show
        height 40px
        line-height 40px
    label
      color #717071
      font-size 22px
      margin-right 15px
      line-height 40px
      display inline-block
    input, select
      margin-right 30px
      appearance none
      border 1px solid #E2DFDE
      border-radius 5px
      width 200px
      height 40px
      line-height 40px
      padding 0 10px
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .role-select
    .dropdown-menu
      max-height none
      overflow visible
</style>
