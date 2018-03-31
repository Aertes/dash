<template>
  <div class="dashboard-wrap box-shadow" @mousewheel.prevent="scrollBarWheel">
    <div class="dashboard-container clearfix" ref="DashBoard">
      <div class="chart-wrap">
        <div class="chart-title">
          <span>{{chartTitle}}</span>
          <span @click="openTables"><svg-icon sign="icon-grid" class="grid-icon"></svg-icon></span>
          <svg-icon sign="icon-chart" class="chart-icon active"></svg-icon>
        </div>
        <div class="chart-cont">
          <i class="sideShadow"></i>
          <div id="charContainer">
            <chart></chart>
          </div>
        </div>
      </div>
      <div class="chart-data-wrap">
        <div class="title-wrap">
          <p class="ellipsis title">CAMPAIGN</p>
          <span class="stick"></span>
          <svg-icon sign="icon-arrow-right" class="icon-arrow"></svg-icon>
        </div>
        <div class="data-list-wrap">
          <ul class="data-list">
            <li>
              <p>980,000</p>
              <p>TARGET</p>
            </li>
            <li>
              <p>100,000</p>
              <p>TARGET TO EC</p>
            </li>
            <li>
              <p>53,043,034</p>
              <p>IMPRESSION</p>
            </li>
            <li>
              <p>¥25.61</p>
              <p>COST PER LEAD</p>
            </li>
          </ul>
          <button class="box-shadow download-button">DOWNLOAD</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../assets/js/velocity.min'
  import Chart from './chart'

  export default {
    name: "DashBoard",
    data() {
      return {
        chartTitle: 'CAMPAIGN OVERVIEW-2018-2',
        canScroll: true
      }
    },
    components: {
      Chart
    },
    methods: {
      scrollBarWheel(e) {
        let value = e.wheelDelta || -e.detail;
        let delta = Math.max(-1, Math.min(1, value));
        let el = this.$refs.DashBoard
        let Velocity = $.Velocity
        if (this.canScroll) {
          this.canScroll = false
          if (delta < 0) {
            Velocity(el, {
              opacity: [1],
              translateY: [0, 100 + '%'],
              translateZ: 0
            }, {
              duration: 800,
              complete: setTimeout(() => this.canScroll = true, 1000)
            });
          } else {
            Velocity(el, {
              opacity: [1],
              translateY: [0, -100 + '%'],
              translateZ: 0
            }, {
              duration: 800,
              complete: setTimeout(() => this.canScroll = true, 1000)
            });
          }
        }
      },
      openTables() {
        this.$Hub.$emit('showTables','tablesBox')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .dashboard-wrap
    float left
    width 1420px
    height 650px
    overflow hidden
    .dashboard-container
      width 100%
      height 100%
      border-radius 10px
      background-color #fff
      overflow hidden
      .chart-data-wrap
        float right
        width 300px
        height 100%
        background-color #F5F6F8
        .title-wrap
          position relative
          height 90px
          padding 0
          padding 0 45px
          border-bottom 2px solid #EDEEEF
          color #2061AE
          .title
            font-size 34px
            line-height 88px
            text-align center
          .stick
            e-pos(top:50%, y:-50%)
            left 0
            width 40px
            height 10px
            background-color #2061AE
            border-radius 0 50px 50px 0
          .icon-arrow
            e-pos(top:50%, y:-50%)
            right 25px
            font-size 18px
        .data-list-wrap
          position relative
          height 560px
          overflow hidden
          .download-button
            e-pos(left:50%, x:-50%)
            bottom 50px
            width 200px
            height 40px
            background-color #2061AE
            border-radius 10px
            color #fff
            border medium
            outline none
            cursor pointer
          .data-list
            padding-top 15px
            li
              width 200px
              margin-top 40px
              p
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
              &:nth-of-type(1)
                p
                  &:nth-of-type(1)
                    font-size 45px
                    color #2061AE
              p
                &:nth-of-type(1)
                  font-size 30px
                  color #A0A0A1
                &:nth-of-type(2)
                  margin-top 5px
                  font-size 20px
                  color #C9CACB
      .chart-wrap
        float left
        width 1120px
        height 100%
        .chart-title
          position relative
          padding 0 30px
          height 88px
          line-height 88px
          color #2061AE
          font-size 30px
          .icon
            e-pos(top:50%, y:-50%)
            font-size 30px
            &.active
              color #B7B5B6
          .chart-icon
            right 80px
          .grid-icon
            right 30px
            cursor pointer
        .chart-cont
          position relative
          height 532px
          margin 0 30px 30px 30px;
          overflow hidden
          #charContainer
            width 100%
            height 100%
          .sideShadow
            e-pos(top:50%, y:-50%)
            right -1px
            width 1px
            height 400px
            box-shadow: -5px 0px 5px 0px rgba(118, 118, 118, 0.4);
            z-index 10
</style>
