<template>
  <div class="tables-wrap" id="tablesBox">
    <div class="tables-title">
      <span>CAMPAIGN OVERVIEW-2018-2</span>
      <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
    </div>
    <div class="clearfix select-wrap">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>
      <selection v-for="item in selectList" :selections="selectOptions"></selection>
    </div>
    <div class="tables-container">
      <table id="tableBox" class="display" style="width:100%">
        <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Salary</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Tiger Nixon</td>
          <td>System Architect</td>
          <td>Edinburgh</td>
          <td>$320,800</td>
        </tr>
        <tr>
          <td>Garrett Winters</td>
          <td>Accountant</td>
          <td>Tokyo</td>
          <td>$170,750</td>
        </tr>
        <tr>
          <td>Ashton Cox</td>
          <td>Junior Technical Author</td>
          <td>San Francisco</td>
          <td>$86,000</td>
        </tr>
        <tr>
          <td>Cedric Kelly</td>
          <td>Senior Javascript Developer</td>
          <td>Edinburgh</td>
          <td>$433,060</td>
        </tr>
        <tr>
          <td>Airi Satou</td>
          <td>Accountant</td>
          <td>Tokyo</td>
          <td>$162,700</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'

  let OVDateUrl = xhrUrls.OV_DATE
  export default {
    name: "Tables",
    data() {
      return {
        selectOptions: [],
        selectList: 1
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {
      if (this.type === 1) {
        this.selectList = 1
        post(OVDateUrl, 'campaign').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            this.selectOptions.push(val)
          })
        })
      }
      ;
      $('#tableBox').DataTable({
        "searching": false,
        "lengthChange": false,
        "ordering": false,
        "pagingType": "simple_numbers",
      });
    },
    methods: {
      closeLayerButton() {
        this.$emit('closeLayer')
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
      padding 10px 50px 20px 50px
      font-size 18px
      table
        border-top 1px solid #EAEAEA
        border-left 1px solid #EAEAEA
        border-bottom medium
        border-right medium
        line-height 30px
        th
        td
          border-bottom 1px solid #EAEAEA
          border-right 1px solid #EAEAEA
          border-top medium
          border-left medium
</style>
