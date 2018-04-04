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
      <table id="tableBox1_1" class="display" style="width:100%">
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
            "isBar": false,
            "isDetailTable": true,
            "isTable": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "isB2C": true,
            "isTable": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "isB2C": true,
            "isTable": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "isTable": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "channel": "JD",
            "isTable": true,
            "isYTD": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "isBar": false,
            "isDetailTable": false,
            "isTable": true,
            "month": "",
            "orderBy": "string",
          },
          {
            "campaign": "OHC SEA",
            "category": "OHC",
            "isBar": true,
            "isDetailTable": true,
            "isTable": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "isB2C": false,
            "isTable": true,
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
            "isTable": true,
            "isYTD": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "category": "MG",
            "isTable": true,
            "month": "",
            "orderBy": "string"
          },
          {
            "category": "",
            "isTable": true,
            "month": "",
            "orderBy": "string"
          }
        ],
        Time: '2018 - 01',
      }
    },
    props:['tableData'],
    computed: {
      type() {
        return this.$store.state.type
      },
      getStoreYearMonth() {
        return this.$store.getters.getYearMonth
      }
    },
    mounted() {

      this.getSelectData()

      //this.monthChange()

      this.dataSearch()

      this.getTableData()

    },
    methods: {
      closeLayerButton() {
        this.$emit('closeLayer')
      },
      getTableData() {
        switch (this.type) {
          case 5:
            $('#tableBox1_5').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
          case 6:
            $('#tableBox1_6').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
          case 7:
            $('#tableBox1_7').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
          case 8:
            $('#tableBox1_8').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
            $('#tableBox1_9').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
          case 10:
            $('#tableBox1_10').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
          default:
            $('#tableBox1_1').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "info":false,
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
      dataSearch() {
        let num = this.type

        let yearMonth = this.getStoreYearMonth

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
          dataEcSearch(this, this.data[num])
        } else if (num == 11) {
          dataEcAllSearch(this, this.data[num])
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
      },
      monthChange() {
        /*this.$Hub.$on('monthChange', (val) => {
          if (this.type == 0) {
            this.data[0].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 1) {
            this.data[1].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 2) {
            this.data[2].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 3) {
            this.data[3].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 3) {
            this.data[4].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
        })*/
      },
      getSelectData() {
        this.selectOptions = ['2018']
        if (this.type === 0) {
          post(OVDateUrl, 'campaign').then(res => {
            let data = res.data.data
            data.forEach((val) => {
              //if(val==='2018') return
              this.selectOptions.push(val)
            })
          })
        } else if (this.type === 1) {
          post(OVDateUrl, 'comB2b').then(res => {
            let data = res.data.data
            data.forEach((val) => {
              this.selectOptions.push(val)
            })
          })
        } else if (this.type === 2) {
          post(OVDateUrl, 'comB2c').then(res => {
            let data = res.data.data
            data.forEach((val) => {
              this.selectOptions.push(val)
            })
          })
        } else if (this.type === 3) {
          post(OVDateUrl, 'crm').then(res => {
            let data = res.data.data
            data.forEach((val) => {
              this.selectOptions.push(val)
            })
          })
        } else if (this.type === 4) {
          post(OVDateUrl, 'reviewRating').then(res => {
            let data = res.data.data
            data.forEach((val) => {
              this.selectOptions.push(val)
            })
          })
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
        this.$nextTick(() => {
          this.ovtableStyle()
          this.getTableData()
        })
      },
      getStoreYearMonth: function () {
        this.dataSearch()
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
      table
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
