<template>
  <div class="dashboard-wrap box-shadow" @wheel.prevent="scrollBarWheel">
    <div class="loading-wrap" v-show="load">
      <img src="../../assets/img/loading.svg" class="loading-svg">
    </div>
    <div class="dashboard-container clearfix" ref="DashBoard">
      <div class="chart-wrap" :style="isTable?'width:100%':''">
        <div class="chart-title">
          <span>{{title}} <span class="timeColor">({{Time}})</span></span>
          <span title="Check the chart" @click="tableViews">
            <svg-icon sign="icon-grid" class="grid-icon" :class="{active:!isTable}"></svg-icon>
          </span>
          <span title="See the table" @click="chartViews">
            <svg-icon sign="icon-chart" class="chart-icon" :class="{active:isTable}"></svg-icon>
          </span>
          <div class="LE-icon-wrap" :class="{active:isTable}">
            <span title="Download URL" @click="downloadUrl({isTable: '1'})">
              <svg-icon sign="icon-link" class="link-icon" :class="{active:!isTable}"></svg-icon>
            </span>
            <span title="Enlarge the table" @click="openTables">
              <svg-icon sign="icon-enlargeK" class="enlarge-icon" :class="{active:!isTable}"></svg-icon>
            </span>
          </div>
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
    dataComSearch,
    dataCrmSearch,
    dataRevRatSearch,
    dataEcSearch,
    dataEcAllSearch,
    dataCmafunnelSearch,
    dataCmaBarSearch,
    dataCmaLineSearch
  } from '../../assets/chartsData/index'

  import {
    setLocalItem,
    getLocalItem,
    removeLocalItem
  } from '../../assets/config/storage'

  let that = this
  let layerId
  export default {
    name: "DashBoard",
    data() {
      return {
        overview: '',
        title: 'CAMPAIGN',
        name: 'CAMPAIGN',
        titleList: [
          'CAMPAIGN',
          'COM.CN B2B',
          'COM.CN B2C',
          'CRM',
          'RATING & REVIEW',
          'CAMPAIGN TRAFFIC',
          'CAMPAIGN KPI',
          'INDIVIDAL CAMPAIGN PERFORMANCE DASHBOARD',
          'COM.CN MONTH TRAFFIC',
          'COM.CN YTD TRAFFIC',
          'CRM MONTH TRAFFIC',
          'CRM YTD TRAFFIC',
          'RATING & REVIEW YTD',
          'RATING & REVIEW MONTH',
          'EC REPORT',
        ],
        Time: '2018/01',
        DData: [],
        data: [
          {
            "isBar": false,
            "isDetailTable": true,
            "isTable": false,
            "month": ""
          },
          {
            "isB2C": false,
            "isTable": false,
            "month": ""
          },
          {
            "isB2C": true,
            "isTable": false,
            "month": ""
          },
          {
            "isTable": false,
            "month": ""
          },
          {
            "isTable": false,
            "isBar": false,
            "month": ""
          },
          {//cam1表
            "chartType": "bar",
            "isDetailTable": false,
            "isTable": false,
            "month": ""
          },
          {//cam2表
            "chartType": "line",
            "isDetailTable": false,
            "isTable": false,
            "month": ""
          },
          {//cam3表
            "chartType": "funnel",
            "isDetailTable": true,
            "isTable": false,
            "month": ""
          },
          {//com.cn.month
            "isB2C": true,
            "isYTD": false,
            "isTable": false,
            "month": ""
          },
          {//com.cn.YTD
            "isB2C": true,
            "isYTD": true,
            "isTable": false,
            "month": ""
          },
          {//crm.month
            "isTable": false,
            "isYTD": false,
            "month": ""
          },
          {//crm.YTD
            "isTable": false,
            "isYTD": true,
            "month": ""
          },
          {
            "isTable": false,
            "isYTD": true,
            "month": ""
          },
          {
            "isTable": false,
            "isYTD": false,
            "month": ""
          },
          {
            "category": "",
            "isTable": false,
            "month": ""
          }
        ],
        dashBoardoption: '',
        dashBoardTableData: '',
        canScroll: true,
        load: false,
        isShow: false,
        isTable: false,
        url: '',
        locationHash: false
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      getStoreYearMonth() {
        return this.$store.getters.getYearMonth
      },
      camOneCategory() {
        return this.$store.state.camOneCategory
      },
      camOneTwoCategory() {
        return this.$store.state.camOneTwoCategory
      },
      camCategory() {
        return this.$store.state.camCategory
      },
      camCompaign() {
        return this.$store.state.camCompaign
      },
      camWeek() {
        return this.$store.state.camWeek
      },
      comMarketType() {
        return this.$store.state.comMarketType
      },
      comMarketTypeTwo() {
        return this.$store.state.comMarketTypeTwo
      },
      rrOneChannel() {
        return this.$store.state.rrOneChannel
      },
      rrChannel() {
        return this.$store.state.rrChannel
      },
      ecCategory() {
        return this.$store.state.ecCategory
      },


      camOneCategoryId() {
        return this.$store.state.camOneCategoryId
      },
      camOneTwoCategoryId() {
        return this.$store.state.camOneTwoCategoryId
      },
      camCategoryId() {
        return this.$store.state.camCategoryId
      },
      camCompaignId() {
        return this.$store.state.camCompaignId
      },
      camWeekId() {
        return this.$store.state.camWeekId
      },
      comMarketTypeId() {
        return this.$store.state.comMarketTypeId
      },
      comMarketTypeTwoId() {
        return this.$store.state.comMarketTypeTwoId
      },
      rrOneChannelId() {
        return this.$store.state.rrOneChannelId
      },
      rrChannelId() {
        return this.$store.state.rrChannelId
      },
      ecCategoryId() {
        return this.$store.state.ecCategoryId
      }
    },
    components: {
      ChartTable,
      Chart
    },
    mounted() {

      //this.monthChange()

      if (!this.locationHash) this.defaultViews()

      this.$Hub.$on('goToWheel', () => {
        this.wheelUp()
      })

      this.$Hub.$on('refreshData', () => {
        this.dataSearch()
      })

      if (window.location.hash.indexOf("?") != -1) {
        this.locationHash = true
      } else {
        this.locationHash = false
      }

      this.locationHash ? this.getUrl() : this.dataSearch()

    },
    updated() {
      this.locationHash = false
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
            if (this.type != 14) {
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

        this.Time = yearMonth.slice(0, 4) + '/' + yearMonth.slice(4, 6)

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
          this.data[num].category = this.camOneCategory
          dataCmaBarSearch(this, this.data[num])
        } else if (num == 6) {
          this.data[num].category = this.camOneTwoCategory
          dataCmaLineSearch(this, this.data[num])
        } else if (num == 7) {
          this.data[num].category = this.camCategory
          this.data[num].campaign = this.camCompaign
          this.data[num].week = this.camWeek
          dataCmafunnelSearch(this, this.data[num])
        } else if (num == 8) {
          if (this.comMarketType == 'B2C') {
            this.data[num].isB2C = true
          } else if (this.comMarketType == 'B2B') {
            this.data[num].isB2C = false
          }
          dataComSearch(this, this.data[num])
        } else if (num == 9) {
          if (this.comMarketTypeTwo == 'B2C') {
            this.data[num].isB2C = true
          } else if (this.comMarketTypeTwo == 'B2B') {
            this.data[num].isB2C = false
          }
          dataComSearch(this, this.data[num])
        } else if (num == 10) {
          dataCrmSearch(this, this.data[num])
        } else if (num == 11) {
          dataCrmSearch(this, this.data[num])
        } else if (num == 12) {
          this.data[num].channel = this.rrOneChannel
          dataRevRatSearch(this, this.data[num])
        } else if (num == 13) {
          this.data[num].channel = this.rrChannel
          dataRevRatSearch(this, this.data[num])
        } else if (num == 14) {
          this.data[num].category = this.ecCategory
          if (this.ecCategory != null || this.ecCategory != undefined) {
            dataEcSearch(this, this.data[num])
          } else {
            dataEcAllSearch(this, this.data[num])
          }
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
      closeLayerButton() {
        layer.close(layerId)
        this.url = ''
      },
      copyURL() {
        let inputUrl = this.$refs.inputUrl;
        inputUrl.select();
        document.execCommand('Copy');
        layer.msg("Copy success !", {
          time: 1000,
          skin: 'fontColor'
        }, function (index) {
          layer.close(index);
        })
      },
      downloadUrl(val) {

        let baseUrl

        if (val.isTable == 1) {

          baseUrl = `${window.location.origin}/dashboard/#/dashboard?istable=1&type=${this.type}&yearMonth=${this.getStoreYearMonth}`;

        } else {

          baseUrl = `${window.location.origin}/dashboard/#/dashboard?istable=0&type=${this.type}&yearMonth=${this.getStoreYearMonth}`;

        }

        let urlParameter = ''

        if (this.type == 5) {

          if (this.camOneCategory != null || this.camOneCategory != undefined) {

            urlParameter = `&category=${this.camOneCategory}&categoryid=${this.camOneCategoryId}`

          }else{
            urlParameter = `&category=null&categoryid=0`
          }

        } else if (this.type == 6) {

          if (this.camOneTwoCategory != null || this.camOneTwoCategory != undefined) {

            urlParameter = `&category=${this.camOneTwoCategory}&categoryid=${this.camOneTwoCategoryId}`

          }else{
            urlParameter = `&category=null&categoryid=0`
          }

        } else if (this.type == 7) {

          if (this.camCategory != null || this.camCategory != undefined) {

            if (this.camCompaign != null || this.camCompaign != undefined) {

              if (this.camWeek != null || this.camWeek != undefined) {

                urlParameter = `&category=${this.camCategory}&categoryid=${this.camCategoryId}&compaign=${this.camCompaign}&compaignid=${this.camCompaignId}&week=${this.camWeek}&weekid=${this.camWeekId}`

              } else {

                urlParameter = `&category=${this.camCategory}&categoryid=${this.camCategoryId}&compaign=${this.camCompaign}&compaignid=${this.camCompaignId}`

              }

            } else {
              urlParameter = `&category=${this.camCategory}&categoryid=${this.camCategoryId}`
            }

          }else{
            urlParameter = `&category=null&categoryid=0`
          }

        } else if (this.type == 8) {

          if (this.comMarketType != null || this.comMarketType != undefined) {

            urlParameter = `&markettype=${this.comMarketType}&markettypeid=${this.comMarketTypeId}`

          }else{
            urlParameter = `&markettype=null&markettypeid=0`
          }

        } else if (this.type == 9) {

          if (this.comMarketTypeTwo != null || this.comMarketTypeTwo != undefined) {

            urlParameter = `&markettype=${this.comMarketTypeTwo}&markettypeid=${this.comMarketTypeTwoId}`

          }else{
            urlParameter = `&markettype=null&markettypeid=0`
          }

        } else if (this.type == 12) {

          if (this.rrOneChannel != null || this.rrOneChannel != undefined) {

            urlParameter = `&channel=${this.rrOneChannel}&channelid=${this.rrOneChannelId}`

          }else{
            urlParameter = `&channel=null&channelid=0`
          }


        } else if (this.type == 13) {

          if (this.rrChannel != null || this.rrChannel != undefined) {

            urlParameter = `&channel=${this.rrChannel}&channelid=${this.rrChannelId}`

          }else{
            urlParameter = `&channel=null&channelid=0`
          }

        } else if (this.type == 14) {

          if (this.ecCategory != null || this.ecCategory != undefined) {

            urlParameter = `&category=${this.ecCategory}&categoryid=${this.ecCategoryId}`

          }else{
            urlParameter = `&category=null&categoryid=0`
          }

        }

        let downloadUrl = encodeURI(`${baseUrl}${urlParameter}`) //encodeURI

        this.url = downloadUrl

        this.layerOpen('downLoadUrl')

      },
      getUrl() {

        let url = window.location.hash;
        let obj = {}

        if (url.indexOf("?") != -1) {

          let str = url.substr(12);

          let strs = str.split("&");

          for (let i = 0; i < strs.length; i++) {

            obj[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]) // unescape

          }
        }

        if (obj.istable == 1) {

          setLocalItem('isTableDefaultShow', true)

          this.defaultViews()

        } else if (obj.istable == 0) {

          removeLocalItem('isTableDefaultShow')

          this.defaultViews()

        }

        this.$store.commit('voluation', Number(obj.type))

        this.$store.commit('yearVoluation', Number(obj.yearMonth.substr(0, 4)))

        this.$store.commit('monthVoluation', Number(obj.yearMonth.substr(4)))

        if (this.type < 5 || this.type == 10 || this.type == 11) {

          this.dataSearch()

        } else if (this.type == 5) {

          if (obj.category != undefined || obj.categoryid != undefined) {

            this.$store.commit('camOneCategoryVoluation', obj.category)

            this.$store.commit('camOneCategoryIdVoluation', Number(obj.categoryid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }

        } else if (this.type == 6) {

          if (obj.category != undefined || obj.categoryid != undefined) {

            this.$store.commit('camOneTwoCategoryVoluation', obj.category)

            this.$store.commit('camOneTwoCategoryIdVoluation', Number(obj.categoryid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }

        } else if (this.type == 7) {

          if (obj.category != undefined || obj.categoryid != undefined) {

            if (obj.compaign != null || obj.compaignid != undefined) {


              if (obj.week != null || obj.weekid != undefined) {

                this.$store.commit('camCategoryVoluation', obj.category)

                this.$store.commit('camCategoryIdVoluation', Number(obj.categoryid))

                this.$store.commit('camCompaignVoluation', obj.compaign)

                this.$store.commit('camCompaignIdVoluation', Number(obj.compaignid))

                this.$store.commit('camWeekVoluation', obj.week)

                this.$store.commit('camWeekIdVoluation', Number(obj.weekid))

                this.dataSearch()

              } else {

                this.$store.commit('camCategoryVoluation', obj.category)

                this.$store.commit('camCategoryIdVoluation', Number(obj.categoryid))

                this.$store.commit('camCompaignVoluation', obj.compaign)

                this.$store.commit('camCompaignIdVoluation', Number(obj.compaignid))

                this.dataSearch()

              }

            } else {

              this.$store.commit('camCategoryVoluation', obj.category)

              this.$store.commit('camCategoryIdVoluation', Number(obj.categoryid))

              this.dataSearch()
            }

          } else {
            this.dataSearch()
          }

        } else if (this.type == 8) {

          if (obj.markettype != undefined || obj.markettypeid != undefined) {

            this.$store.commit('comMarketTypeVoluation', obj.markettype)

            this.$store.commit('comMarketTypeIdVoluation', Number(obj.markettypeid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }


        } else if (this.type == 9) {

          if (obj.markettype != undefined || obj.markettypeid != undefined) {

            this.$store.commit('comMarketTypeTwoVoluation', obj.markettype)

            this.$store.commit('comMarketTypeTwoIdVoluation', Number(obj.markettypeid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }


        } else if (this.type == 12) {

          if (obj.channel != undefined || obj.channelid != undefined) {

            this.$store.commit('rrOneChannelVoluation', obj.channel)

            this.$store.commit('rrOneChannelIdVoluation', Number(obj.channelid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }


        } else if (this.type == 13) {

          if (obj.channel != undefined || obj.channelid != undefined) {

            this.$store.commit('rrChannelVoluation', obj.channel)

            this.$store.commit('rrChannelIdVoluation', Number(obj.channelid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }

        } else if (this.type == 14) {

          if (obj.category != undefined || obj.categoryid != undefined) {

            this.$store.commit('ecCategoryVoluation', obj.category)

            this.$store.commit('ecCategoryIdVoluation', Number(obj.categoryid))

            this.dataSearch()

          } else {
            this.dataSearch()
          }

        }

      },
      openTables() {
        this.$Hub.$emit('showTables', {id: 'tablesBox', tableData: this.dashBoardTableData})
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

        //this.dataSearch()

        if (!this.locationHash) {
          this.dataSearch()
        }

      },
      isTable: function () {
        this.dataSearch()
      },
      getStoreYearMonth: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      camOneCategory: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      camOneTwoCategory: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      camCategory: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      camCompaign: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      camWeek: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      comMarketType: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      comMarketTypeTwo: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      rrOneChannel: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      rrChannel: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
      },
      ecCategory: function () {
        if (!this.locationHash) this.dataSearch() //this.dataSearch()
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
    height 670px
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
          height 580px
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
              margin-top 45px
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
          .timeColor
            color #a0a0a1
          .icon
            e-pos(top:50%, y:-50%)
            font-size 30px
            cursor pointer
            &.active
              color #B7B5B6
          .chart-icon
            &.active
              right 153px
            right 63px
          .grid-icon
            &.active
              right 20px
            right 110px
          .LE-icon-wrap
            e-pos(top:50%, y:-50%)
            display none
            right 27px
            &.active
              display block
            .link-icon
              right 41px
              font-size 27px
            .enlarge-icon
              right 0
              font-size 27px
        .chart-cont
          position relative
          height 572px
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
        padding: 0 10px 0px
        vertical-align: bottom
        cursor pointer
        margin-left 20px
        font-size 20px
        background-color #2061AE
        border-radius 10px
        color #fff
        border medium
        outline none
        cursor pointer
</style>
