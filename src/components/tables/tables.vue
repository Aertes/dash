<template>
  <div class="tables-wrap" id="tablesBox">
    <div class="tables-title">
      <span>{{title}} - {{Time}}</span>
      <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
    </div>
    <div class="clearfix select-wrap">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>
      <selection v-for="item in selectList" :selections="selectOptions"></selection>
    </div>
    <div class="tables-container">
      <table id="tableBox1" class="display" style="width:100%">
        <thead>
        <tr>
          <th>KPI</th>
          <th>Month</th>
          <th>Target</th>
          <th>M v.s T</th>
          <th>YTD</th>
          <th>Target</th>
          <th>Y v.s T</th>
        </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'
  import {
    dataOvCmaSearch,
    dataOvComB2BSearch,
    dataOvComB2CSearch,
    dataOvCrmSearch,
    dataOvRevSearch
  } from '../../assets/chartsData/index'

  let OVDateUrl = xhrUrls.OV_DATE
  export default {
    name: "Tables",
    data() {
      return {
        selectOptions: [],
        selectList: 1,
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
        data: [
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "endDate": "2017-01-01",
            "isBar": false,
            "isDetailTable": true,
            "isTable": true,
            "month": "201801",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "endDate": "2017-01-01",
            "isB2C": false,
            "isTable": true,
            "month": "201801",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "endDate": "2017-01-01",
            "isB2C": true,
            "isTable": true,
            "month": "201801",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "endDate": "2017-01-01",
            "isTable": true,
            "month": "201801",
            "orderBy": "string",
            "startDate": "2017-01-01"
          },
          {
            "channel": "JD",
            "endDate": "2017-01-01",
            "isTable": true,
            "isYTD": true,
            "month": "201801",
            "orderBy": "string",
            "startDate": "2017-01-01"
          }
        ],
        tableData: '',
        Time: '2018 - 01',
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {
      if (this.type === 0) {
        this.selectList = 1
        post(OVDateUrl, 'campaign').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            this.selectOptions.push(val)
          })
        })
      }

      this.$Hub.$on('monthChange', (val) => {
        if (this.type == 0) {
          this.data[0].month = val
          this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
          this.dataSearch()
        }
      })

      this.dataSearch()

      this.getTableData()

    },
    methods: {
      closeLayerButton() {
        this.$emit('closeLayer')
      },
      getTableData() {
        $('#tableBox1').DataTable({
          "searching": false,
          "lengthChange": false,
          "ordering": false,
          'bDestroy': true,
          "pagingType": "simple_numbers",
          data: this.tableData,
          columns: [
            {data: 'item'},
            {data: 'month'},
            {data: 'target'},
            {
              data: 'mT',
              render: (data, type, row) => {
                if (data == 0) {
                  return '<div></div>'
                } else if (data == 1) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: gray"></div>'
                } else if (data == 2) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: green"></div>'
                } else if (data == 3) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: yellow"></div>'
                } else if (data == 4) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: red"></div>'
                }
              }
            },
            {data: 'ytd'},
            {data: 'ytdTarget'},
            {
              data: 'yT',
              render: (data, type, row) => {
                if (data == 0) {
                  return '<div></div>'
                } else if (data == 1) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: gray"></div>'
                } else if (data == 2) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: green"></div>'
                } else if (data == 3) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: yellow"></div>'
                } else if (data == 4) {
                  return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: red"></div>'
                }
              }
            }
          ]
        })
      },
      dataSearch() {
        if (this.type == 0) {
          dataOvCmaSearch(this, this.data[0])
        } else if (this.type == 1) {
          dataOvComB2BSearch(this, this.data[1])
        } else if (this.type == 2) {
          dataOvComB2CSearch(this, this.data[2])
        } else if (this.type == 3) {
          dataOvCrmSearch(this, this.data[3])
        } else if (this.type == 4) {
          dataOvRevSearch(this, this.data[4])
        }
      },
      ovtableStyle() {
        let tData = this.tableData
        if (this.type == 0) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Traffic to e-commerce(M) '
            } else if (index == 1) {
              val.item = 'Traffic to .com.cn(M) '
            } else if (index == 2) {
              val.item = 'Conversion rate '
            } else if (index == 3) {
              val.item = 'Cost per lead(¥)'
            }
          })
          this.tableData = tData
        } else if (this.type == 1) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Total SQL'
            } else if (index == 1) {
              val.item = 'Total MQL'
            } else if (index == 2) {
              val.item = 'UGCR'
            } else if (index == 3) {
              val.item = 'Total Web Traffic(K)'
            }
          })
          this.tableData = tData
        } else if (this.type == 2) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Traffic(excluding campaign)(M)'
            } else if (index == 1) {
              val.item = 'conversion rate(excluding campaign)'
            } else if (index == 2) {
              val.item = 'UGCR'
            } else if (index == 3) {
              val.item = 'Bounce rate'
            }
          })
          this.tableData = tData
        } else if (this.type == 3) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'New registration(M)'
            } else if (index == 1) {
              val.item = 'Engagement%'
            } else if (index == 2) {
              val.item = 'CRM related sales(M)(¥)'
            }
          })
          this.tableData = tData
        } else if (this.type == 4) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Rating'
            }
          })
          this.tableData = tData
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
        this.dataSearch()
      },
      tableData() {
        this.$nextTick(()=>{
          this.ovtableStyle()
          this.getTableData()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .tables-wrap
    width 1800px
    max-height 800px
    background-color #fff
    border-radius 15px
    z-index: 99999
    overflow hidden
    display none
    .select-wrap
      padding-left 60px
    .dropdown-wrap
      margin-right 80px
      float left
    .options-icon-date
      font-size 22px
      color #A0A0A1
      float left
      margin 8px 18px 0 0
    .tables-title
      position relative
      padding-left 45px
      font-size 35px
      line-height 80px
      color #2061AE
      .icon
        e-pos(top:50%, y:-50%)
        right 25px
        font-size 30px
        color #A0A0A1
        cursor pointer
    .tables-container
      padding 15px 50px 20px 50px
      font-size 18px
      table#tableBox1
        border-top 1px solid #EAEAEA
        border-left 1px solid #EAEAEA
        border-bottom medium
        border-right medium
        line-height 30px
        text-align center
        th
        td
          border-bottom 1px solid #EAEAEA
          border-right 1px solid #EAEAEA
          border-top medium
          border-left medium

</style>
