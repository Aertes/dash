<template>
  <div class="timeline-wrap">
    <i class="line"></i>
    <div class="time-month">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span class="acitve">5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span>10</span>
      <span>11</span>
      <span>12</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "TimeLine"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .timeline-wrap
    position relative
    float right
    width 80px
    height 650px
    overflow hidden
    .line
      display block
      width 2px
      height 650px
      background-color #D1D1D2
    .time-month
      position absolute
      width 100%
      height 100%
      left 0
      top -47px
      span
        position absolute
        left 0
        left 50%
        width 30px
        height 30px
        margin-left -16px
        line-height 28px
        font-size 16px
        border 1px solid #c9caca
        border-radius 50%
        color #c9caca
        background-color #F2F2F2
        text-align center
        cursor pointer
        for row in 1 2 3 4 5 6 7 8 9 10 11 12
          &:nth-child({row})
            top 55px * row
      .acitve
        width 60px
        height 60px
        line-height 57px
        left 50%
        font-size 23px
        color #fff
        margin-top -15px
        margin-left -31px
        background url("../../assets/img/timeline_active.png") no-repeat center #F2F2F2
        background-size cover
</style>
