<template>
  <div class="dashboard-wrap box-shadow" @mousewheel.prevent="scrollBarWheel">
    <div class="loading-wrap" v-show="load">
      <img src="../../assets/img/loading.svg" class="loading-svg">
    </div>
    <div class="dashboard-container clearfix" ref="DashBoard">
      <div class="chart-wrap" :style="isTable?'width:100%':''">
        <div class="chart-title">
          <span>{{title}} - {{Time}}</span>
          <span @click="tableViews"><svg-icon sign="icon-grid" class="grid-icon" :class="{active:!isTable}"></svg-icon></span>
          <span @click="chartViews"><svg-icon sign="icon-chart" class="chart-icon" :class="{active:isTable}"></svg-icon></span>
        </div>
        <div class="chart-cont">
          <!--<i class="sideShadow"></i>-->
          <div id="charContainer">

            <keep-alive>
              <chart-table v-if="isTable" :tableData="dashBoardTableData" @closeLoading="loadingHandle"></chart-table>
              <chart v-else="!isTable" :chartOptions="dashBoardoption" @closeLoading="loadingHandle"></chart>
            </keep-alive>

          </div>
        </div>
      </div>
      <div class="chart-data-wrap" :style="isTable?'width:0px':''">
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
          <button class="box-shadow download-button" @click="downloadUrl">DOWNLOAD</button>
        </div>
      </div>
    </div>


    <div class="downLoadUrl" id="downLoadUrl">
      <div class="tables-title">
        <span class="title">Download</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
      <div class="content">
        <input type="text" name="url" id="url" ref="inputUrl" :value="url">
        <button type="button" @click="copyURL">Click on the copy</button>
      </div>
        
    </div>
  
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../assets/js/velocity.min'
  import Chart from './chart'
  import ChartTable from '../tables/chartTables'
  import {
    dataOvCmaSearch,
    dataOvComB2BSearch,
    dataOvComB2CSearch,
    dataOvCrmSearch,
    dataOvRevSearch,
    dataCmaSearch,
    dataCmafunnelSearch,
    dataComSearch,
    dataCrmSearch,
    dataRevRatSearch,
    dataEcSearch,
    dataEcAllSearch
  } from '../../assets/chartsData/index'
  import {
    getLocalItem
  } from '../../assets/config/storage'

  let that = this
  let layerId
  export default {
    name: "DashBoard",
    data() {
      return {
        overview: 'Overview',
        title: 'Overview Campaign',
        name: 'Campaign',
        titleList: [
          'Campaign',
          'Com.Cn B2B',
          'Com.Cn B2C',
          'Crm',
          'Rating & Review',
          'B2C Campaign Performance',
          'Individal Campaign Performance Dashboard',
          'Com.Cn',
          'Crm',
          'Rating & Review YTD',
          'Rating & Review Month',
          'EC REPORT',
        ],
        Time: '2018-01',
        DData: [],
        data: [
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "isBar": false,
            "isDetailTable": true,
            "isTable": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "isB2C": true,
            "isTable": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "isB2C": true,
            "isTable": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "isTable": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "channel": "JD",
            "isTable": false,
            "isBar": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "isBar": true,
            "isDetailTable": false,
            "isTable": false,
            "month": "",
            "orderBy": "string",
          },
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "isBar": false,
            "isDetailTable": true,
            "isTable": false,
            "month": "201803",
            "orderBy": "string"
          },
          {
            "isB2C": false,
            "isTable": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "isTable": false,
            "month": "",
            "orderBy": "string"
          },
          {
            "channel": "JD",
            "isTable": false,
            "isYTD": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "channel": "total",
            "endDate": "2017-01-01",
            "isTable": false,
            "isYTD": true,
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "category": "",
            "isTable": false,
            "month": "",
            "orderBy": "string"
          }
        ],
        dashBoardoption: '',
        dashBoardTableData: '',
        canScroll: true,
        load: false,
        isShow: false,
        isTable: false,
        url:''
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      getStoreYearMonth() {
        return this.$store.getters.getYearMonth
      }
    },
    components: {
      ChartTable,
      Chart
    },
    beforeCreate() {
      
    },
    mounted() {

      // alert(this.getStoreYearMonth)
      this.defaultViews()

      

      this.dataSearch()

      //this.monthChange()

      this.$Hub.$on('goToWheel', () => {
        this.wheelUp()
      })

      this.getUrl();

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
            if (this.type != 11) {
              this.increment()
              this.wheelDown()
            }
          } else {//up
            if (this.type != 0) {
              this.decrement()
              this.wheelUp()
            }
          }
        }
      },
      loading() {
        this.load = true
      },
      loadingHandle() {
        this.load = false
      },
      dataSearch(val) {
        this.loading()
        let num = this.type
        let yearMonth = this.getStoreYearMonth
        /*if(val){
          yearMonth = val
        }else{
          if( getMonth < 10){
            yearMonth = getYear + '0' + getMonth
          }else{
            yearMonth = getYear + getMonth
          }
        }*/
        this.Time = yearMonth.slice(0, 4) + ' - ' + yearMonth.slice(4, 6)

        this.data[num].isTable = this.isTable

        this.data[num].month = yearMonth
        if (num == 0) {
          dataOvCmaSearch(this, this.data[num])
        } else if (num == 1) {
          dataOvComB2BSearch(this, this.data[num])
        } else if (num == 2) {
          dataOvComB2CSearch(this, this.data[num])
        } else if (num == 3) {
          dataOvCrmSearch(this, this.data[num])
        } else if (num == 4) {
          dataOvRevSearch(this, this.data[num])
        } else if (num == 5) {
          dataCmaSearch(this, this.data[num])
        } else if (num == 6) {
          dataCmafunnelSearch(this, this.data[num])
        } else if (num == 7) {
          dataComSearch(this, this.data[num])
        } else if (num == 8) {
          dataCrmSearch(this, this.data[num])
        } else if (num == 9) {
          dataRevRatSearch(this, this.data[num])
        } else if (num == 10) {
          dataRevRatSearch(this, this.data[num])
          //dataEcSearch(this, this.data[num])
        } else if (num == 11) {
          dataEcAllSearch(this, this.data[num])
        }
      },
      monthChange() {
        this.$Hub.$on('monthChange', (val) => {

          /*this.dataSearch(val)

          if (this.type == 0) {
            this.data[0].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }else if (this.type == 1) {
            this.data[1].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }else if (this.type == 2) {
            this.data[2].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }else if (this.type == 3) {
            this.data[3].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }else if (this.type == 3) {
            this.data[4].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }*/
        })
      },
      tableViews() {
        this.isTable = true
      },
      chartViews() {
        this.isTable = false
      },
      defaultViews() {
        if (!getLocalItem('isTableDefaultShow')) {
          this.isTable = false
        } else {
          this.isTable = true
        }
      },
      layerOpen(id) {
        layerId = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`)
        })
      },
      closeLayerButton(){
        layer.close(layerId)
        this.url = ''
      },
      downloadUrl() {
        let baseUrl = window.location.origin;
        let downloadUrl = baseUrl + '/#/dashboard?type='+this.type+'&yearMonth='+this.getStoreYearMonth+''
        this.url = downloadUrl
        this.layerOpen('downLoadUrl')
      },
      copyURL(){
        let inputUrl = this.$refs.inputUrl;
        inputUrl.select();
        document.execCommand('Copy');
        console.log(this.$refs.inputUrl)
        layer.msg("Copy success !");
      },
      getUrl(){
        let url = window.location.hash;
        let obj = {}
        if (url.indexOf("?") != -1) {
          let str = url.substr(12);
          let strs = str.split("&");
          for(let i=0; i<strs.length; i++){
            obj[strs[i].split('=')[0]]=unescape(strs[i].split('=')[1])
          }
        }
        this.$store.commit('voluation', Number(obj.type))
        this.$store.commit('yearVoluation', Number(obj.yearMonth.substr(0, 4)))
        this.$store.commit('monthVoluation', Number(obj.yearMonth.substr(4)))

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
        this.dataSearch()
      },
      isTable: function () {
        this.dataSearch()
      },
      getStoreYearMonth: function () {
        alert(this.getStoreYearMonth)

        this.dataSearch()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .dashboard-wrap
    position relative
    float left
    width 1440px
    height 650px
    border-radius 10px
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
        transition: width .2s linear
        -ms-transition: width .2s linear
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
              width 250px
              margin-top 40px
              p
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
              &:nth-of-type(1)
                p
                  &:nth-of-type(1)
                    font-size 35px
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
        width 1140px
        height 100%
        transition: width .2s linear
        -ms-transition: width .2s linear
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
            cursor pointer
            &.active
              color #B7B5B6
          .chart-icon
            right 80px
          .grid-icon
            right 30px
        .chart-cont
          position relative
          height 552px
          margin 0 20px 10px 20px;
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
  .downLoadUrl
    .tables-title
      position: relative
      padding-left: 30px
      font-size: 24px
      line-height: 80px
      color: #a0a0a1
      .icon
        e-pos(top:50%, y:-50%)
        right: 25px
        font-size: 24px
        color: #A0A0A1
        cursor: pointer
    .content
      padding 20px 30px 60px 30px
      input
        padding: 10px
        width: 500px
        height: 40px
        line-height: 40px
        font-size 20px
      button
        height: 40px
        line-height: 40px
        background: #fff
        border: 1px solid #ccc
        padding: 0 10px 0px
        vertical-align: bottom
        cursor pointer
        margin-left 20px
        font-size 20px

</style>
