<template>
  <div class="tables-wrap" id="tablesBox">
    <div class="tables-title">
      <span>{{title}} - {{Time}}</span>
      <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
    </div>
    <div class="clearfix select-wrap">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>

      <selection v-if="selectionOne" :selections="selectOptionsOne" @selectShowOne="selectShowOneHandle"></selection>

      <selection v-if="selectionTwo" :selections="selectOptionsTwo" @selectShowTwo="selectShowTwoHandle"
                 ref="selectionTwoBox"></selection>

      <selection v-if="selectionThree" :selections="selectOptionsThree" @selectShowThree="selectShowThreeHandle"
                 ref="selectionThreeBox" class="styleone"></selection>

      <selection v-if="selectionFour" :selections="selectOptionsFour" @selectShowFour="selectShowFourHandle"
                 ref="selectionFourBox"></selection>

      <selection v-if="selectionFive" :selections="selectOptionsFour" @selectShowFour="selectShowFiveHandle"
                 ref="selectionFiveBox"></selection>

      <!--<selection v-for="item in selectList" :selections="selectOptions"></selection>-->
    </div>
    <div class="tables-container">
      <div class="tableBoxwrap" v-show="isShow1">
        <table id="tableBoxDialog1" class="display" style="width:100%">
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

      <div class="tableBoxwrap" v-show="isShow5">
        <table id="tableBoxDialog5" class="display" style="width:100%">
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
      </div>

      <div class="tableBoxwrap" v-show="isShow6">
        <table id="tableBoxDialog6" class="display" style="width:100%">
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
      </div>

      <div class="tableBoxwrap" v-show="isShow7">
        <table id="tableBoxDialog7" class="display" style="width:100%">
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
      </div>

      <div class="tableBoxwrap" v-show="isShow8">
        <table id="tableBoxDialog8" class="display" style="width:100%">
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
      </div>

      <div class="tableBoxwrap" v-show="isShow9">
        <table id="tableBoxDialog9" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Channel</th>
            <th>Category</th>
            <th>Rate</th>
            <th>&lt; 4.3%</th>
            <th>4.3%-4.8%</th>
            <th>&gt; 4.8%</th>
            <th>Sellout volume</th>
            <th>% of review</th>
            <th>Total review</th>
            <th>Positive</th>
            <th>Neutral</th>
            <th>Negative</th>
            <th>% of negative</th>
            <th>Timely Response</th>
            <th>Timely Reponse%</th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow10">
        <table id="tableBoxDialog10" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Channel</th>
            <th>Category</th>
            <th>Rate</th>
            <th>&lt; 4.3%</th>
            <th>4.3%-4.8%</th>
            <th>&gt; 4.8%</th>
            <th>Sellout volume</th>
            <th>% of review</th>
            <th>Total review</th>
            <th>Positive</th>
            <th>Neutral</th>
            <th>Negative</th>
            <th>% of negative</th>
            <th>Timely Response</th>
            <th>Timely Reponse%</th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow11">
        <table id="tableBoxDialog11" class="display" style="width:100%">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {
    get,
    post,
    uploadPost
  } from '../../assets/config/http'
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
    dataEcAllSearch,
    formatThousands
  } from '../../assets/chartsData/index'

  let OVDateUrl = xhrUrls.OV_DATE
  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  let EC_CATEGORY = xhrUrls.EC_CATEGORY

  export default {
    name: "Tables",
    data() {
      return {
        selectOptionsOne: [],
        selectOptionsTwo: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        selectOptionsThree: [],
        selectOptionsFour: [],
        selectOptionsFive: [],
        selectionOne: true,
        selectionTwo: true,
        selectionThree: false,
        selectionFour: false,
        selectionFive: false,
        isShow1: false,
        isShow5: false,
        isShow6: false,
        isShow7: false,
        isShow8: false,
        isShow9: false,
        isShow10: false,
        isShow11: false,
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
            "isBar": false,
            "isDetailTable": true,
            "isTable": true,
            "month": ""
          },
          {
            "isB2C": false,
            "isTable": true,
            "month": ""
          },
          {
            "isB2C": true,
            "isTable": true,
            "month": ""
          },
          {
            "isTable": true,
            "month": ""
          },
          {
            "isTable": true,
            "isBar": false,
            "month": ""
          },
          {
            "isBar": true,
            "isDetailTable": false,
            "isTable": true,
            "month": ""
          },
          {
            "isBar": false,
            "isDetailTable": true,
            "isTable": true,
            "month": ""
          },
          {
            "isB2C": true,
            "isTable": true,
            "month": ""
          },
          {
            "isTable": true,
            "month": ""
          },
          {
            "isTable": true,
            "isYTD": true,
            "month": ""
          },
          {
            "isTable": true,
            "isYTD": false,
            "month": ""
          },
          {
            "category": "",
            "isTable": true,
            "month": ""
          }
        ],
        Time: '2018 - 01',
      }
    },
    props: ['tableData'],
    computed: {
      type() {
        return this.$store.state.type
      },
      getStoreYearMonth() {
        return this.$store.getters.getYearMonth
      },
      month() {
        return this.$store.state.month
      },
      camOneCategory() {
        return this.$store.state.camOneCategory
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
      rrOneChannel() {
        return this.$store.state.rrOneChannel
      },
      rrChannel() {
        return this.$store.state.rrChannel
      },
      ecCategory() {
        return this.$store.state.ecCategory
      }
    },
    mounted() {

      this.getTimeMonth()
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
            this.isShow1 = false
            this.isShow5 = true
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog5').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": true,
              data: this.tableData,
              columns: [
                {data: 'item'},
                {
                  data: 'spending',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'impression',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'traffic',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'trafficEc',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'trafficEcTarget',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
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
                {
                  data: 'trafficCom',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'trafficComTarget',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
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
                {
                  data: 'ctr',
                  render: (data, type, row) => {
                    return '<div>'+ (data*100).toFixed(2) +'%</div>'
                  }
                },
                {
                  data: 'leads',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'costLead',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'baseLine',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
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
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                    return '<div>'+ (data*100).toFixed(2) +'%</div>'
                  }
                },
                {
                  data: 'baseLineConversion',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
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
            this.isShow11 = false
            $('#tableBoxDialog6').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "scrollX": true,
              "scrollCollapse": true,
              "paging": true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
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
                {
                  data: 'spending',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'impression',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'click',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'ctr',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'leads',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'costLead',
                  render: (data, type, row) => {
                    return '<div>'+ formatThousands(data) +'</div>'
                  }
                },
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
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
            this.isShow11 = false
            $('#tableBoxDialog7').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,

              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              data: this.tableData,
              columns: [
                {data: 'item'},
                {
                  data: 'month',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'ytd',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'target',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
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
                  data: 'ytdTarget',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
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
            break;
          case 8:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = true
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog8').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'item'
                },
                {
                  data: 'month',
                  render: (data, type, row) => {
                    if(row.item == "CRM Engagement Rate"){
                      return '<div>'+ (data*100).toFixed(2) + '%</div>'
                    }else{
                      return '<div>'+ formatThousands(data) +'</div>'
                    }
                  }
                },
                {
                  data: 'ytd',
                  render: (data, type, row) => {
                    if(row.item == "CRM Engagement Rate"){
                      return '<div>'+ (data*100).toFixed(2) + '%</div>'
                    }else{
                      return '<div>'+ formatThousands(data) +'</div>'
                    }
                  }
                },
                {
                  data: 'target',
                  render: (data, type, row) => {
                    if(row.item == "CRM Engagement Rate"){
                      return '<div>'+ (data*100).toFixed(2) + '%</div>'
                    }else{
                      return '<div>'+ formatThousands(data) +'</div>'
                    }
                  }
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
                  data: 'ytdTarget',
                  render: (data, type, row) => {
                    if(row.item == "CRM Engagement Rate"){
                      return '<div>'+ (data*100).toFixed(2) + '%</div>'
                    }else{
                      return '<div>'+ formatThousands(data) +'</div>'
                    }
                  }
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
            break;
          case 9:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = true
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog9').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": true,
              data: this.tableData.data,
              columns: [
                {data: 'channel'},
                {data: 'category'},
                {data: 'avgRating'},
                {
                  data: 'smallVolume',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'midVolume',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'bigVolume',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'selloutVolume',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'percentReview',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'totalReview',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'positive',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'neutral',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'negative',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'percentNegative',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'timelyResponse',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'timelyResponseRate',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
              ]
            })
            break;
          case 10:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = true
            this.isShow11 = false
            $('#tableBoxDialog10').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": true,
              data: this.tableData.data,
              columns: [
                {data: 'channel'},
                {data: 'category'},
                {data: 'avgRating'},
                {
                  data: 'smallVolume',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'midVolume',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'bigVolume',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'selloutVolume',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'percentReview',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'totalReview',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'positive',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'neutral',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'negative',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'percentNegative',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'timelyResponse',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'timelyResponseRate',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
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
            this.isShow10 = false
            this.isShow11 = true
            $('#tableBoxDialog11').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'category'
                },
                {
                  data: 'period'
                },
                {
                  data: 'traffic1',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'conversionRate1',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'traffic2',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'conversionRate2',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'traffic3',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'conversionRate3',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'traffic4',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'conversionRate4',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
                {
                  data: 'traffic5',
                  render: (data, type, row) => {
                      return '<div>'+formatThousands(data)+'</div>'
                  }
                },
                {
                  data: 'conversionRate5',
                  render: (data, type, row) => {
                      return '<div>'+(data*100).toFixed(2)+'%</div>'
                  }
                },
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
            $('#tableBoxDialog1').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 6,
              "info": false,
              data: this.tableData,
              columns: [{
                data: 'item',
              },
                {
                  data: 'month',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Conversion rate ":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>'+ (data).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'target',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Conversion rate ":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>'+ (data).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
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
                  data: 'ytd',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Conversion rate ":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>'+ (data).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'ytdTarget',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Conversion rate ":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>'+ (data*100).toFixed(2) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>'+ (data).toFixed(2) + '%</div>'
                        break;
                      default:
                        return '<div>'+ formatThousands(data) +'</div>'
                        break;
                    }
                  }
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
            break;
        }
      },
      dataSearch() {
        //let num = this.type

        let yearMonth = this.getStoreYearMonth

        this.Time = yearMonth.slice(0, 4) + ' - ' + yearMonth.slice(4, 6)

        /*this.data[num].isTable = this.isTable

        this.data[num].month = yearMonth*/

        /*if (num == 0) {
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
          dataCmaSearch(this, this.data[num])
        } else if (num == 6) {
          this.data[num].category = this.camCategory
          this.data[num].campaign = this.camCompaign
          this.data[num].week = this.camWeek
          dataCmafunnelSearch(this, this.data[num])
        } else if (num == 7) {
          if(this.comMarketType == 'B2C'){
            this.data[num].isB2C = true
          }else if(this.comMarketType == 'B2B'){
            this.data[num].isB2C = false
          }
          dataComSearch(this, this.data[num])
        } else if (num == 8) {
          dataCrmSearch(this, this.data[num])
        } else if (num == 9) {
          this.data[num].channel = this.rrOneChannel
          dataRevRatSearch(this, this.data[num])
        } else if (num == 10) {
          this.data[num].channel = this.rrChannel
          dataRevRatSearch(this, this.data[num])
        } else if (num == 11) {

          this.data[num].category = this.ecCategory

          if(this.ecCategory!=null || this.ecCategory!=undefined){
            dataEcSearch(this, this.data[num])
          }else{
            dataEcAllSearch(this, this.data[num])
          }
        }*/
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
      getTimeMonth() {
        this.$refs.selectionTwoBox.nowIndex = (this.month - 1)
      },
      getYear() {
        const getYear = new Date().getFullYear().toString()
        this.selectOptionsOne = [getYear]
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
      getCampaignDate(year) {
        post(OVDateUrl, 'campaign').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getComB2bDate(year) {
        post(OVDateUrl, 'comB2b').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getComB2cDate(year) {
        post(OVDateUrl, 'comB2c').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getCrmDate(year) {
        post(OVDateUrl, 'crm').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptions.push(val)
          })
        })
      },
      getReviewRatingDate(year) {
        post(OVDateUrl, 'reviewRating').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getEcDate(year) {
        post(OVDateUrl, 'reviewRating').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      selectShowOneHandle(val) {

        this.$store.commit('yearVoluation', val)

      },
      selectShowTwoHandle(val) {

        this.$store.commit('monthVoluation', val)

      },
      selectShowThreeHandle(val) {

        this.getSelectData(val)

      },
      selectShowFourHandle(val) {

        this.$store.commit('camCompaignVoluation', val)

        if (this.camCompaign != null || this.camCompaign != undefined) {
          const url = `${CAM_GETPARAMETER}?category=${this.camCategory}&campaign=${this.camCompaign}`
          this.selectionFour = true
          get(url).then(res => {
            let data = res.data.data
            this.selectOptionsFive = ['全部']
            data.forEach((val) => {
              this.selectOptionsFive.push(val)
              this.$refs.selectShowFiveBox.nowIndex = 0
            })
          })
        } else {
          this.selectionFour = false
        }

      },
      selectShowFiveHandle(val) {

        this.$store.commit('camWeekVoluation', val)

      },
      getSelectData(val) {
        const getYear = new Date().getFullYear().toString()
        this.getYear()
        if (this.type === 0) {
          this.selectionThree = false
          this.selectionFour = false
          this.selectionFive = false
          this.getCampaignDate(getYear)
        } else if (this.type === 1) {
          this.selectionThree = false
          this.selectionFour = false
          this.selectionFive = false
          this.getComB2bDate(getYear)
        } else if (this.type === 2) {
          this.selectionThree = false
          this.selectionFour = false
          this.selectionFive = false
          this.getComB2cDate(getYear)
        } else if (this.type === 3) {
          this.selectionThree = false
          this.selectionFour = false
          this.selectionFive = false
          this.getCrmDate(getYear)
        } else if (this.type === 4) {
          this.selectionThree = false
          this.selectionFour = false
          this.selectionFive = false
          this.getReviewRatingDate(getYear)
        } else if (this.type === 5) {

          this.selectionThree = true
          this.selectionFour = false
          this.selectionFive = false

          this.$store.commit('camOneCategoryVoluation', val)

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['全部']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
          })

        } else if (this.type === 6) {
          this.selectionThree = true
          this.selectionFour = false
          this.selectionFive = false

          this.$store.commit('camCategoryVoluation', val)

          this.$store.commit('camCompaignVoluation', null)

          this.$store.commit('camWeekVoluation', null)

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['全部']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
          })

          if (this.camCategory != null || this.camCategory != undefined) {
            const url = `${CAM_GETPARAMETER}?category=${this.camCategory}`
            this.selectionThree = true
            get(url).then(res => {
              let data = res.data.data
              this.selectOptionsThree = ['全部']
              data.forEach((val) => {
                this.selectOptionsThree.push(val)
                this.$refs.selectionThreeBox.nowIndex = 0
              })
            })
          }

        } else if (this.type === 7) {

          this.selectionThree = true
          this.selectionFour = false
          this.selectionFive = false

          this.$store.commit('comMarketTypeVoluation', val)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['B2C', 'B2B']

        } else if (this.type === 8) {

          this.selectionFive = false
          this.selectionThree = false
          this.selectionFour = false

          this.getCampaignDate(getYear)

        } else if (this.type === 9) {

          this.selectionThree = true
          this.selectionFour = false
          this.selectionFive = false

          this.$store.commit('rrOneChannelVoluation', val)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['全部', 'JD', 'Tmall']

        } else if (this.type === 10) {

          this.selectionThree = true
          this.selectionFour = false
          this.selectionFive = false

          this.$store.commit('rrChannelVoluation', val)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['全部', 'JD', 'Tmall']

        } else if (this.type === 11) {

          this.selectionThree = true
          this.selectionFour = false
          this.selectionFive = false

          this.$store.commit('ecCategoryVoluation', val)

          this.getCampaignDate(getYear)

          get(EC_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['全部']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
          })

        }
      }
    },
    watch: {
      type: function (val) {

        this.getSelectData(null)

        if (this.$refs.selectionThreeBox.nowIndex) {
          this.selectOptionsThree = []
          this.$refs.selectionThreeBox.nowIndex = 0
        }

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
          this.dataSearch()
        })
      },
      /*getStoreYearMonth: function () {
        this.dataSearch()
      },
      month: function () {
        this.getTimeMonth()
      },
      camOneCategory: function () {
        this.dataSearch()
      },
      camCategory: function () {
        this.dataSearch()
      },
      camCompaign: function () {
        this.dataSearch()
      },
      camWeek: function () {
        this.dataSearch()
      },
      comMarketType: function () {
        this.dataSearch()
      },
      rrOneChannel: function () {
        this.dataSearch()
      },
      rrChannel: function () {
        this.dataSearch()
      },
      ecCategory: function () {
        this.dataSearch()
      }*/
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
    .styleone
      width 350px
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
