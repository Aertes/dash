<template>
  <div class="myChart" id="myChart" ref="myEchart"></div>
</template>

<script type="text/ecmascript-6">
  import {defaultOption} from '../../assets/chartsStyle/index'

  export default {
    name: "chart",
    props:{
      chartOptions:{
        default:()=>{
          return defaultOption
        }
      }
    },
    computed: {
      EchartsInit() {
        return this.$echarts.init(this.$refs.myEchart)
      }
    },
    mounted() {
      window.onresize = this.EchartsInit.resize
    },
    methods: {
      Echarts() {
        this.EchartsInit.setOption(this.chartOptions);
      },
      closeLoading(){
        this.$emit('closeLoading')
      }
    },
    watch:{
      chartOptions(){
        this.$nextTick(()=>{
          this.Echarts();
          this.closeLoading()
        })
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .myChart
    height 100%
    width 100%
</style>
