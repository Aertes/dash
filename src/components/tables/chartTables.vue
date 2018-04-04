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
    <table id="tableBox1" v-show="isShow1" class="display" style="width:100%">
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
    <table id="tableBox5" v-show="isShow5" class="display" style="width:100%">
      <thead>
        <tr>
          <th>Period</th>
          <th>Spending</th>
          <th>Impression</th>
          <th>Traffic</th>
          <th>Traffic to EC</th>
          <th>Target</th>
          <th></th>
          <th>Traffic to .com</th>
          <th>Target</th>
          <th></th>
          <th>CTR</th>
          <th>Leads</th>
          <th>Cost per lead</th>
          <th>Baseline</th>
          <th></th>
          <th>Conversion%</th>
          <th>Baseline</th>
          <th></th>
        </tr>
      </thead>
    </table>
    <table id="tableBox6" v-show="isShow6" class="display" style="width:100%">
      <thead>
      <tr>
        <th>Week</th>
        <th>Period</th>
        <th>Channel</th>
        <th>Spending</th>
        <th>Impression</th>
        <th>Click</th>
        <th>CTR</th>
        <th>Leads</th>
        <th>Cost per lead</th>
        <th>Conversion%</th>
      </tr>
      </thead>
    </table>
    <table id="tableBox7" v-show="isShow7" class="display" style="width:100%">
      <thead>
        <tr>
          <th>Marketing Metrics</th>
          <th>Month</th>
          <th>YTD</th>
          <th>Monthly Target</th>
          <th></th>
          <th>YTD Target</th>
          <th></th>
        </tr>
      </thead>
    </table>
    <table id="tableBox8" v-show="isShow8" class="display" style="width:100%">
      <thead>
        <tr>
          <th>Marketing Metrics</th>
          <th>Month</th>
          <th>YTD</th>
          <th>Monthly target</th>
          <th></th>
          <th>YTD Target</th>
          <th></th>
        </tr>
      </thead>
    </table>
    <table id="tableBox9" v-show="isShow9" class="display" style="width:100%">
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
    <table id="tableBox11" v-show="isShow10" class="display" style="width:100%">
      <thead>
        <tr>
          <th rowspan="2">Category</th>
          <th rowspan="2">Period</th>
          <th colspan="2">Total</th>
          <th colspan="2">站外</th>
          <th colspan="2">钻展</th>
          <th colspan="2">搜索</th>
          <th colspan="2">其他</th>
        </tr>
        <tr>
          <th>Traffic</th>
          <th>Conversion%</th>
          <th>Traffic</th>
          <th>Conversion%</th>
          <th>Traffic</th>
          <th>Conversion%</th>
          <th>Traffic</th>
          <th>Conversion%</th>
          <th>Traffic</th>
          <th>Conversion%</th>
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
        checked: false,
        isShow1: false,
        isShow5: false,
        isShow6: false,
        isShow7: false,
        isShow8: false,
        isShow9: false,
        isShow10: false,
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
        switch (this.type) {
          case 5:
            this.isShow1 = false
            this.isShow5 = true
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            $('#tableBox5').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              data: this.tableData,
              columns: [
                {data: 'item'},
                {data: 'spending'},
                {data: 'impression'},
                {data: 'traffic'},
                {data: 'trafficEc'},
                {data: 'trafficEcTarget'},
                {
                  data: 'h',
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
                {data: 'trafficCom'},
                {data: 'trafficComTarget'},
                {
                  data: 'k',
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
                {data: 'ctr'},
                {data: 'leads'},
                {data: 'costLead'},
                {data: 'baseLine'},
                {
                  data: 'p',
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
                {data: 'conversionRate'},
                {data: 'baseLineConversion'},
                {
                  data: 's',
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
            break;
          case 6:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = true
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            $('#tableBox6').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              data: this.tableData,
              columns: [
                {data: 'week'},
                {
                  data: 'startDate',
                  render: (data, type, row) => {
                      return '<div>'+data+'-'+row.endDate+'</div>'
                  }
                },
                {data: 'channel'},
                {data: 'spending'},
                {data: 'impression'},
                {data: 'click'},
                {
                  data: 'ctr',
                  render: (data, type, row) => {
                      return '<div>'+(data.toFixed(2)*100)+'%</div>'
                  }
                },
                {data: 'leads'},
                {data: 'costLead'},
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                      return '<div>'+(data.toFixed(2)*100)+'%</div>'
                  }
                  
                }
              ]
            })
            break;
          case 7:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = true
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            $('#tableBox7').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              data: this.tableData,
              columns: [
                {data: 'item'},
                {data: 'month'},
                {data: 'ytd'},
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
            break;
          case 8:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = true
            this.isShow9 = false
            this.isShow10 = false
            $('#tableBox8').DataTable({
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
            break;
          case 9:
            $('#tableBox9').DataTable({
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
            break;
          case 11:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = true
            $('#tableBox11').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              data: this.tableData,
              columns: [
                {data: 'category'},
                {data: 'period'},
                {data: 'traffic1'},
                {data: 'conversionRate1'},
                {data: 'traffic2'},
                {data: 'conversionRate2'},
                {data: 'traffic3'},
                {data: 'conversionRate3'},
                {data: 'traffic4'},
                {data: 'conversionRate4'},
                {data: 'traffic5'},
                {data: 'conversionRate5'},
              ]
            })
            break;
          default:
            this.isShow1 = true
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
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
            break;
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
        }else if(this.type == 5){
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Month'
            } else if (index == 1) {
              val.item = 'YTD'
            } else if (index == 2) {
              val.item = 'Q1'
            } else if (index == 3) {
              val.item = 'Q2'
            } else if (index == 4) {
              val.item = 'Q3'
            } else if (index == 5) {
              val.item = 'Q4'
            }
          })
          this.tableData = tData
        }else if(this.type == 7){
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Traffic'
            } else if (index == 1) {
              val.item = 'Free Traffic'
            } else if (index == 2) {
              val.item = 'Paid Traffic'
            } else if (index == 3) {
              val.item = 'Bounce Rate'
            } else if (index == 4) {
              val.item = 'Conversion Rate'
            } else if (index == 5) {
              val.item = 'UGCR'
            } else if (index == 6) {
              val.item = 'MQL'
            } else if (index == 7) {
              val.item = 'SQL'
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
