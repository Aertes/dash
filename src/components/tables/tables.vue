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
    dataEcAllSearch
  } from '../../assets/chartsData/index'
  
  let OVDateUrl = xhrUrls.OV_DATE
  export default {
    name: "Tables",
    data() {
      return {
        selectOptions: [],
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
        data: [{
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
    props: ['tableData'],
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
              "pageLength": 3,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'item',
                },
                {
                  data: 'spending'
                },
                {
                  data: 'impression'
                },
                {
                  data: 'traffic'
                },
                {
                  data: 'trafficEc'
                },
                {
                  data: 'trafficEcTarget'
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
                  data: 'trafficCom'
                },
                {
                  data: 'trafficComTarget'
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
                  data: 'ctr'
                },
                {
                  data: 'leads'
                },
                {
                  data: 'costLead'
                },
                {
                  data: 'baseLine'
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
                  data: 'conversionRate'
                },
                {
                  data: 'baseLineConversion'
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
              "pagingType": "simple_numbers",
              "pageLength": 3,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'week'
                },
                {
                  data: 'startDate',
                  render: (data, type, row) => {
                    return '<div>' + data + '-' + row.endDate + '</div>'
                  }
                },
                {
                  data: 'channel'
                },
                {
                  data: 'spending'
                },
                {
                  data: 'impression'
                },
                {
                  data: 'click'
                },
                {
                  data: 'ctr',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'leads'
                },
                {
                  data: 'costLead'
                },
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
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
              "pageLength": 3,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'item'
                },
                {
                  data: 'month'
                },
                {
                  data: 'ytd'
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
              "pageLength": 3,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'item'
                },
                {
                  data: 'month'
                },
                {
                  data: 'ytd'
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
              "pageLength": 3,
              "info": false,
              data: this.tableData.data,
              columns: [{
                  data: 'channel'
                },
                {
                  data: 'category'
                },
                {
                  data: 'avgRating'
                },
                {
                  data: 'smallVolume',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'midVolume',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'bigVolume',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'selloutVolume'
                },
                {
                  data: 'percentReview',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'totalReview'
                },
                {
                  data: 'positive'
                },
                {
                  data: 'neutral'
                },
                {
                  data: 'negative'
                },
                {
                  data: 'percentNegative',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'timelyResponse'
                },
                {
                  data: 'timelyResponseRate',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
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
              "pageLength": 3,
              "info": false,
              data: this.tableData.data,
              columns: [{
                  data: 'channel'
                },
                {
                  data: 'category'
                },
                {
                  data: 'avgRating'
                },
                {
                  data: 'smallVolume',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'midVolume',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'bigVolume',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'selloutVolume'
                },
                {
                  data: 'percentReview',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'totalReview'
                },
                {
                  data: 'positive'
                },
                {
                  data: 'neutral'
                },
                {
                  data: 'negative'
                },
                {
                  data: 'percentNegative',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
                  }
                },
                {
                  data: 'timelyResponse'
                },
                {
                  data: 'timelyResponseRate',
                  render: (data, type, row) => {
                    return '<div>' + (data.toFixed(2) * 100) + '%</div>'
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
              "pageLength": 3,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'category'
                },
                {
                  data: 'period'
                },
                {
                  data: 'traffic1'
                },
                {
                  data: 'conversionRate1'
                },
                {
                  data: 'traffic2'
                },
                {
                  data: 'conversionRate2'
                },
                {
                  data: 'traffic3'
                },
                {
                  data: 'conversionRate3'
                },
                {
                  data: 'traffic4'
                },
                {
                  data: 'conversionRate4'
                },
                {
                  data: 'traffic5'
                },
                {
                  data: 'conversionRate5'
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
              "pageLength": 3,
              "info": false,
              data: this.tableData,
              columns: [{
                  data: 'item',
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
      type: function(val) {
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
      getStoreYearMonth: function() {
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
