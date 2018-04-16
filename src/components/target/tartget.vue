<template>

  <div class="target-warp">
    <div action="" class="clearfix search-wrap">
      <div class="search">
        <selection :selections="selectTargetOptions" class="role-select" @selectShowOne="selectTagetHandle"></selection>
      </div>
      <div class="search" v-show="B">
        <selection :selections="selectBOptions" class="role-select" ref="B" @selectShowOne="selectBHandle"></selection>
      </div>
      <div class="search">
        <selection :selections="selectTimeOptions" class="role-select" ref="time"
                   @selectShowOne="selectTimeHandle"></selection>
      </div>
      <!--<span><svg-icon sign="icon-search" class="searchIcon"></svg-icon></span>-->
    </div>

    <div class="tables">
      <div class="role-table clearfix">
        <table id="Table" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th>YearMonth</th>
            <th>Baselline Conversion Target</th>
            <th>Baselline Cost Per Load</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'

  let TARGET_GETDATE = xhrUrls.TARGET_GETDATE
  let TARGET_UPDATE = xhrUrls.TARGET_UPDATE
  let TARGET_CAMSEARCH = xhrUrls.TARGET_CAMSEARCH
  let TARGET_CAMSAVE = xhrUrls.TARGET_CAMSAVE

  export default {
    name: "tartget",
    data() {
      return {
        selectTargetOptions: ['CAMPAIGN', 'COM', 'CRM'],
        selectBOptions: ['B2C', 'B2B'],
        selectTimeOptions: ['All'],
        camTableData: '',
        comTableData: '',
        crmTableData: '',
        time: '',
        B: false
      }
    },
    computed: {
      campaignTime() {
        return this.$refs.target.$refs.input.value
      }
    },
    mounted() {
      this.camTableEdit()
      this.getCamData()
    },
    methods: {
      getCamData() {
        post(TARGET_CAMSEARCH, {
          'month': this.time == 'All' ? null : this.time
        })
          .then(res => {
            let data = res.data.data.data
            this.camTableData = data
          })
        post(TARGET_GETDATE, 'campaign')
          .then(res => {
            let data = res.data.data
            data.forEach(val => {
              this.selectTimeOptions.push(val)
            })
          })
      },
      getCamTable() {
        $('#Table').DataTable({
          searching: false,
          lengthChange: false,
          autoWidth: false,
          info: false,
          bDestroy: true,
          ordering: false,
          pagingType: "simple_numbers",
          pageLength: 7,
          "paging": this.camTableData.length > 7 ? true : false,
          data: this.camTableData,
          columns: [
            {
              data: 'month',
              render: (data, type, row) => {
                return '<div class="editInput">' +
                  '<input type="text" class="" value="' + data + '" data-type="0" data-month="' + row.month + '" data-baseline="' + row.baseLine + '" data-id="' + row.id + '" data-costLead="' + row.costLead + '" style="display: none">' +
                  '<span>' + data + '</span>' +
                  '</div>';
              }
            },
            {
              data: 'baseLine',
              render: (data, type, row) => {
                return '<div class="editInput">' +
                  '<input type="text" class="" value="' + data + '" data-type="1" data-month="' + row.month + '" data-baseline="' + row.baseLine + '" data-id="' + row.id + '" data-costLead="' + row.costLead + '" style="display: none">' +
                  '<span>' + data + '</span>' +
                  '</div>';
              }
            },
            {
              data: 'costLead',
              render: (data, type, row) => {
                return '<div class="editInput" data-id="0">' +
                  '<input type="text" class="" value="' + data + '" data-type="2" data-month="' + row.month + '" data-baseline="' + row.baseLine + '" data-id="' + row.id + '" data-costLead="' + row.costLead + '" style="display: none">' +
                  '<span>' + data + '</span>' +
                  '</div>';
              }
            }
          ]
        })
      },
      selectTagetHandle(val) {
        if (val == 'COM') {
          this.B = true
        } else {
          this.B = false
        }
      },
      selectBHandle(val) {
      },
      selectTimeHandle(val) {
        this.time = val
      },
      camTableEdit() {
        $(document).on('click','.editInput',function(){
          $(this).find('input').show().focus().end().find('span').hide()
        })
        $(document).on('blur','.editInput input',function(){
          $(this).hide().siblings('span').show()
          let month = $(this).data('month')
          let baseLine = $(this).data('baseline')
          let id = $(this).data('id')
          let costLead = $(this).data('costlead')
          let inputVal = $(this).val()
          let type = $(this).data('type')
          let data = ''
          if(type==0){
            data = {
              "baseLine": baseLine,
              "costLead": costLead,
              "id": id,
              "month": inputVal
            }
          }else if(type==1){
            data = {
              "baseLine": inputVal,
              "costLead": costLead,
              "id": id,
              "month": month
            }
          }else if(type==2){
            data = {
              "baseLine": baseLine,
              "costLead": inputVal,
              "id": id,
              "month": month
            }
          }
          post(TARGET_UPDATE,data).then(res=>{
            let code = res.data.code
            if(code!=200){
              layer.confirm(res.data.errMsg, {
                title: 'Prompt information',
                btn: ['Cancel'],
              })
            }else{
              $(this).hide().siblings('span').text(inputVal)
            }
          })
        })
      }
    },
    watch: {
      camTableData() {
        this.$nextTick(() => {
          this.getCamTable()
        })
      },
      time() {
        this.$nextTick(() => {
          this.getCamData()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .target-warp
    .search-wrap
      width 100%
    .search
      float left
      margin-right 40px
      .dropdown-wrap
        display inline-block
        width 200px
        height 40px
        line-height 40px
        .dropdown-show
          height 40px
          line-height 40px
      label
        color #717071
        font-size 22px
        margin-right 15px
        line-height 40px
        display inline-block
      input, select
        margin-right 30px
        appearance none
        border 1px solid #E2DFDE
        border-radius 5px
        width 200px
        height 40px
        line-height 40px
        padding 0 10px
    .searchIcon
      font-size 30px
      color #717071
      margin-top 7px
      cursor pointer
    .tables
      width 100%
      margin-top 30px
      .user-create
        color #2061ae
        font-size 22px
        vertical-align -3px
      .create
        border 1px solid #b3b1b2
        border-radius 5px
        height 55px
        line-height 55px
        cursor pointer
        padding-left 20px
        background rgba(241, 240, 240, 0.7)
        .newUser
          margin-left 10px
          color: #2061ae
        span
          color #838383
          font-size 20px
      .role-table
        margin-top 20px
        position relative
        width 100%
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .role-select
    .dropdown-menu
      max-height none
      overflow visible
  .tab-card
    .role-table
      .dataTables_wrapper
        position static
        text-align center
        line-height 30px
  .editInput
    input
      text-align center
</style>
