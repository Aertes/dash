<template>
  <div class="app-wrapper">
    <my-header></my-header>
    <login></login>
    <my-footer></my-footer>
    <div class="loading" v-show="isShow">
            <img src="../../assets/img/loading.gif" alt="">
      </div>
      <div class="mark" v-show="isShow"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "../login/Header";
import Login from "../login/login";
import MyFooter from "../login/Footer";

export default {
  name: "index",
  components: {
    MyHeader,
    Login,
    MyFooter
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
@import '../../assets/style/mixin.styl';

</style>

