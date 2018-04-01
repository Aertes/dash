<template>
  <div class="dashboard-wrap box-shadow" @mousewheel.prevent="scrollBarWheel">
    <div class="loading-wrap" v-show="load">
      <img src="../../assets/img/loading.svg" class="loading-svg">
    </div>
    <div class="dashboard-container clearfix" ref="DashBoard">
      <div class="chart-wrap">
        <div class="chart-title">
          <span>{{title}} - {{Time}}</span>
          <span @click="openTables"><svg-icon sign="icon-grid" class="grid-icon"></svg-icon></span>
          <svg-icon sign="icon-chart" class="chart-icon active"></svg-icon>
        </div>
        <div class="chart-cont">
          <i class="sideShadow"></i>
          <div id="charContainer">
            <chart :chartOptions="dashBoardoption" @closeLoading="loadingHandle"></chart>
          </div>
        </div>
      </div>
      <div class="chart-data-wrap">
        <div class="title-wrap">
          <p class="ellipsis title">{{name}}</p>
          <span class="stick"></span>
          <svg-icon sign="icon-arrow-right" class="icon-arrow"></svg-icon>
        </div>
        <div class="data-list-wrap">
          <ul class="data-list">
            <li v-for="item in DData">
              <p>{{item[1]}}</p>
              <p>{{item[0]}}</p>
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
  import {
    dataOvCmaSearch,
    dataOvComB2BSearch,
    dataOvComB2CSearch,
    dataOvCrmSearch,
    dataOvRevSearch
  } from '../../assets/chartsData/index'

  let that = this
  export default {
    name: "DashBoard",
    data() {
      return {
        overview: 'OVERVIEW',
        title: 'OVERVIEW CAMPAIGN',
        name: 'CAMPAIGN',
        titleList: [
          'CAMPAIGN',
          'COM.CN B2B',
          'COM.CN B2C',
          'CRM',
          'RATING & REVIEW',

          'CAMPAIGN',
          'COM.CN B2B',
          'COM.CN B2C',
          'CRM',
          'RATING & REVIEW YTD',
          'RATING & REVIEW Month',
          'EC REPORT',
        ],
        Time: '2018 - 01',
        DData: [],
        data: [
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "endDate": "2017-01-01",
            "isBar": false,
            "isDetailTable": true,
            "isTable": false,
            "month": "201801",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "endDate": "2017-01-01",
            "isB2C": false,
            "isTable": false,
            "month": "201803",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "endDate": "2017-01-01",
            "isB2C": true,
            "isTable": false,
            "month": "201803",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "endDate": "2017-01-01",
            "isTable": false,
            "month": "201803",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "channel": "JD",
            "endDate": "2017-01-01",
            "isTable": false,
            "isYTD": true,
            "month": "201803",
            "orderBy": "string",
            "startDate": "2017-01-01"
          }
        ],
        dashBoardoption: '',
        canScroll: true,
        load: false
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    components: {
      Chart
    },
    mounted() {
      this.getDashBoardData()

      this.$Hub.$on('goToWheel', () => {
        this.wheelUp()
      })
    },
    methods: {
      increment() {
        this.$store.commit('increment')
      },
      decrement() {
        this.$store.commit('decrement')
      },
      wheelDown() {
        let el = this.$refs.DashBoard
        let Velocity = $.Velocity
        this.canScroll = false
        Velocity(el, {
          opacity: [1, 0],
          translateY: [0, 100 + '%'],
          translateZ: 0
        }, {
          duration: 800,
          complete: () => {
            setTimeout(() => this.canScroll = true, 500)
          }
        });
      },
      wheelUp() {
        let el = this.$refs.DashBoard
        let Velocity = $.Velocity
        this.canScroll = false
        Velocity(el, {
          opacity: [1, 0],
          translateY: [0, -100 + '%'],
          translateZ: 0
        }, {
          duration: 800,
          complete: () => {
            setTimeout(() => this.canScroll = true, 500)
          }
        });
      },
      scrollBarWheel(e) {
        let value = e.wheelDelta || -e.detail;
        let delta = Math.max(-1, Math.min(1, value));
        if (this.canScroll) {
          if (delta < 0) {//down
            this.increment()
            this.wheelDown()
          } else {//up
            this.decrement()
            this.wheelUp()
          }
        }
      },
      openTables() {
        this.$Hub.$emit('showTables', 'tablesBox')
      },
      loading() {
        this.load = true
      },
      loadingHandle() {
        this.load = false
      },
      getDashBoardData() {

        this.loading()

        this.$Hub.$on('monthChange', (val) => {
          if (this.type == 0) {
            this.data[0].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4,6)
            dataOvCmaSearch(this, this.data[0])
          }
        })

        if (this.type == 0) {
          dataOvCmaSearch(this, this.data[0])
        }
      }
    },
    watch: {
      type: function (val) {
        if (val < 5) {
          this.name = `${this.titleList[val]}`
          this.title = `${this.overview} ${this.name}`
        } else {
          this.name = `${this.titleList[val]}`
          this.title = `${this.name}`
        }
        //this.getDashBoardData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .dashboard-wrap
    position relative
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
    .loading-wrap
      position absolute
      width 100%
      height 100%
      z-index 10
      background-color rgba(255, 255, 255, .7)
      img
        e-pos(top:50%, y:-50%, left:50%, x:-50%)
        width 300px
        height 300px
</style>
