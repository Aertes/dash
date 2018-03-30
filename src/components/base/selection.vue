<template>
  <a href="javascript:;" class="dropdown-wrap" @blur="toggleUp">
    <div class="dropdown-show" @click="toggleDrop">
      <input type="text" v-model="selections[nowIndex].label" disabled/>
      <svg-icon sign="icon-arrow-down" class="arrow-down"></svg-icon>
    </div>
    <ul class="dropdown-menu" v-show="isShow">
      <li v-for="(items,index) in selections" @click="chooseSelection(index)">{{items.label}}</li>
    </ul>
  </a>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "selection",
    data() {
      return {
        isShow: false,
        nowIndex: 0
      }
    },
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      }
    },
    methods: {
      toggleDrop() {
        this.isShow = !this.isShow
      },
      toggleUp(e) {
        this.isShow = false
      },
      chooseSelection(index) {
        this.nowIndex = index
        this.isShow = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin'

  .dropdown-wrap
    position relative
    display block
    width 240px
    height 35px
    outline none
    .dropdown-show
      position relative
      width 100%
      height 35px
      cursor pointer
      .arrow-down
        e-pos(top:50%, y:-50%)
        right 10px
        font-size 13px
        color #A0A0A1
      input
        width 100%
        height 100%
        padding-left 10px
        appearance none
        border 1px solid #E2DFDE
        border-radius 5px
        color #A0A0A1
        font-size 16px
        &:disabled
          background-color #fff
    .dropdown-menu
      position absolute
      top 37px
      width 100%
      font-size: 15px
      color #A0A0A1
      line-height 35px
      background-color #fff
      border 1px solid #E2DFDE
      border-radius 5px
      overflow hidden
      z-index 10
      li
        padding-left 10px
        border-bottom 1px solid #eaeaea
        cursor: pointer
        &:last-of-type
          border-bottom medium
        &:hover
          background-color #F5F6F8
</style>
