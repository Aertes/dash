<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from "../navbar/navbar";

export default {
  name: "login",
  components: {
    NavBar,
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    showOperation() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .app-wrapper
    position relative
    margin 0 39px
    height 100%
</style>

