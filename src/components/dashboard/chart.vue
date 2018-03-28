<template>
    <div>
        <div class="chart" id="chart" style="width: 100%;height:100%;">asdasd</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "chart",
  data() {
    return {
      chartDataName: [
        "直接访问",
        "邮件营销",
        "联盟广告",
        "视频广告",
        "搜索引擎"
      ],
      chartNameX: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      chartLeftNameY: "数量（个）",
      chartRightNameY: "利率(%)",
      chartDate: [
        {
          name: "直接访问",
          type: "bar",
          stack: "总量",
          yAxisIndex: 0,
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "总量",
          yAxisIndex: 0,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "总量",
          yAxisIndex: 0,
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          // stack: '1',
          yAxisIndex: 1,
          data: [0.8, 0.1, 0.9, 1.9, 0.3, 0.4, 1.1]
        },
        {
          name: "搜索引擎",
          type: "line",
          // stack: '1',
          yAxisIndex: 1,
          data: [1.8, 0.5, 0.9, 1.5, 0.1, 0.4, 2.1]
        }
      ]
    };
  },
  methods: {
    Echarts() {
      // window.addEventListener('resize', () => {
      //     this.drawLineDom.resize();
      //     this.todayFlowDom.resize();
      //     this.hitRateDom.resize();
      //     this.drawLineDom = this.$echarts.init(document.getElementById('chart'));
      // })
      let myChart = this.$echarts.init(document.getElementById("chart"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "cross" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.chartDataName
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        barWidth: 10,
        xAxis: {
          type: "category",
          data: this.chartNameX
        },
        yAxis: [
          {
            type: "value",
            name: this.chartLeftNameY,
            min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: this.chartRightNameY,
            min: 0,
            // max: 25,
            interval: 0.5,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: this.chartDate
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.Echarts();
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/style/mixin.styl';

.app-main-wrap {
    margin-left: 315px;

    .options-bar {
        padding: 20px 0;
        border-radius: 10px;
        background-color: #fff;

        .options-icon-date {
            font-size: 22px;
            color: #A0A0A1;
            float: left;
            margin: 8px 18px 0 39px;
        }

        .options-menu {
            position: relative;
            float: right;
            margin-right: 25px;

            .icon {
                font-size: 35px;
                color: #2061AE;
                cursor: pointer;
            }

            .dashboard-operation {
                position: absolute;
                right: -24px;
                top: 60px;
                line-height: 60px;
                background-color: #F5F6F8;
                border-radius: 10px;
                white-space: nowrap;
                z-index: 9999;

                .a-wrap {
                    border-radius: 10px;
                    overflow: hidden;
                }

                a {
                    display: block;
                    padding: 0 25px;

                    &:nth-of-type(2) {
                        border-top: 1px solid #E8E9E9;
                        border-bottom: 1px solid #E8E9E9;
                    }

                    &:hover {
                        background-color: #fff;
                    }
                }

                .icon {
                    font-size: 27px;
                    color: #2061AE;
                }

                .upload-icon {
                    font-size: 32px;
                }

                span {
                    margin-left: 15px;
                    font-size: 20px;
                    color: #A0A0A1;
                    vertical-align: middle;
                }

                .triangle {
                    position: absolute;
                    top: -15px;
                    right: 20px;
                    width: 44px;
                    height: 15px;
                }
            }
        }

        .styleone {
            width: 380px;
        }
    }

    .dashboard-all-wrap {
        margin-top: 25px;
    }
}
</style>
