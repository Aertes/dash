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
.app-wrapper {
  position: relative;
  
  height: 100%;
}
.mark {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.3;
    overflow: hidden;
    background-color: #f9f9f9;
    display: none;
  }
.loading{
  e-pos(top: 40%, y: -50%, left: 50%, x:-50%);
  z-index : 10001;
   display: none;
}
</style>

