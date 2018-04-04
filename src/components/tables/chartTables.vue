<template>
  <div class="chart-tables-container" id="tableWrap">
    <div class="clearfix table-set">
      <span @click="openTables"><svg-icon sign="icon-enlarge" class="enlarge"></svg-icon></span>
      <label>
        <input type="checkbox" v-model="checked">
        <svg-icon :sign="checked ? 'icon-checked' : 'icon-check'" class="checkBox"></svg-icon>
        <span>Set Default View</span>
      </label>
    </div>
    <table id="tableBox1" class="display" width="100%">
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
</template>

<script type="text/ecmascript-6">
  import {
    setLocalItem,
    getLocalItem,
    removeLocalItem
  } from '../../assets/config/storage'

  export default {
    name: "chart-table",
    data() {
      return {
        checked: false
      }
    },
    props: ['tableData'],
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {

      this.defaultViews()

      this.getTableData()

    },
    methods: {
      bindScrollbar() {
        $("#charContainer").mCustomScrollbar({
          axis: "x",
          theme: "light-3",
          advanced: {autoExpandHorizontalScroll: true}
        });
      },
      getTableData() {
        $('#tableBox1').DataTable({
          "searching": false,
          "lengthChange": false,
          "ordering": false,
          'bDestroy': true,
          "pagingType": "simple_numbers",
          "pageLength": 4,
          info: false,
          data: this.tableData,
          columns: [
            {
              data: 'item'
            },
            {
              data: 'month'
            },
            {
              data: 'target'
            },
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
            {
              data: 'ytd'
            },
            {
              data: 'ytdTarget'
            },
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
      },
      openTables() {
        this.$Hub.$emit('showTables', 'tablesBox')
      },
      defaultViews() {
        this.checked = getLocalItem('isTableDefaultShow')
      },
      closeLoading() {
        this.$emit('closeLoading')
      }
    },
    watch: {
      tableData() {
        this.$nextTick(() => {
          this.ovtableStyle()
          this.getTableData()
          this.closeLoading()
        })
      },
      checked() {
        if (this.checked) {
          setLocalItem('isTableDefaultShow', true)
        } else {
          removeLocalItem('isTableDefaultShow')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .chart-tables-container
    position relative
    width 100%
    height 100%
    font-size 18px
    overflow auto
    .table-set
      position absolute
      left 0
      bottom 20px
      z-index 1
      label
        .checkBox
          vertical-align -6px
          color #2061AE
          font-size 25px
          margin-right 5px
        input
          display none
        span
          font-size 20px
      .enlarge
        vertical-align -8px
        font-size 30px
        color #2061AE
        margin-right 20px
        cursor pointer
    table
      border-top 1px solid #EAEAEA
      border-left 1px solid #EAEAEA
      border-bottom medium
      border-right medium
      line-height 30px
      text-align center
      height 87%
      th
      td
        border-bottom 1px solid #EAEAEA
        border-right 1px solid #EAEAEA
        border-top medium
        border-left medium
</style>
