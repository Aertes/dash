<template>
  <div class="app-main-wrap">

    <div class="options-bar box-shadow clearfix">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>

      <selection v-if="selectionOne" :selections="selectOptionsOne" @selectShowOne="selectShowOneHandle" ref="selectionOne"></selection>

      <selection v-if="selectionTwo" :selections="selectOptionsTwo" @selectShowTwo="selectShowTwoHandle" ref="selectionTwo"></selection>

      <selection v-if="selectionThree" :selections="selectOptionsThree" @selectShowThree="selectShowThreeHandle" ref="selectionThree"></selection>

      <selection v-if="selectionFour" :selections="selectOptionsFour" @selectShowFour="selectShowFourHandle" ref="selectionFour"></selection>

      <div v-if="all" class="options-menu">
        <div @click="showOperation">
          <svg-icon sign="icon-more"></svg-icon>
        </div>
        <div class="dashboard-operation box-shadow" v-show="isShow">
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <a href="javascript:;" v-for="(item,index) in menuList"
               @click="openUpload(item.link, item.type, item.name)">
              <svg-icon v-if="item.status" sign="icon-upload" class="upload-icon"></svg-icon>
              <span v-if="item.status">{{item.name}}</span>
            </a>
            <router-link v-if="system" to="/">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>SYSTEM SETTIN</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix dashboard-all-wrap">
      <time-line></time-line>
      <dash-board></dash-board>
      <upload-file ref='upload'></upload-file>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import DashBoard from '../dashboard/dashboard'
  import TimeLine from '../timeline/timeline'
  import xhrUrls from '../../assets/config/xhrUrls'
  import UploadFile from '../../components/upload/upload'
  import {get, post, uploadPost} from '../../assets/config/http'
  import {getSessionItem} from "../../assets/config/storage.js"

  let OVDateUrl = xhrUrls.OV_DATE
  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY

  export default {
    name: "appmain",
    data() {
      return {
        USERINFO: null,
        system: false,
        all: false,
        isShow: false,
        selectOptionsOne: [],
        selectOptionsTwo: [],
        selectOptionsThree: [],
        selectOptionsFour: [],
        selectionOne: true,
        selectionTwo: false,
        selectionThree: false,
        selectionFour: false,
        menuList: [
          {
            name: 'CAMPAIGN',
            link: xhrUrls.CMA_UPLOAD,
            type: 'Campaign',
            status: false,
          },
          {
            name: 'COM.CN',
            link: xhrUrls.COM_UPLOAD,
            type: 'Com',
            status: false,
          },
          {
            name: 'CRM',
            link: xhrUrls.CRM_UPLOAD,
            type: 'Crm',
            status: false,
          },
          {
            name: 'RATING & REVIEW',
            link: xhrUrls.RV_UPLOAD,
            type: 'ReviewRating',
            status: false,
          },
          {
            name: 'EC REPORT',
            link: xhrUrls.EC_UPLOAD,
            type: 'Ec',
            status: false,
          }
        ]
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      selO() {
        return this.$refs.selectionTwo.selections
      }
    },
    mounted() {


      this.getYear()

      this.getSelectData()

      const USERINFO = JSON.parse(getSessionItem('USERINFO'))

      this.USERINFO = USERINFO;

      try {
        let per = USERINFO.permissions;
        per.forEach((v, i) => {
          if (v == 'compaign:upload') {
            this.menuList[0].status = true;
          }
          if (v == 'com:upload') {
            this.menuList[1].status = true;
          }
          if (v == 'crm:upload') {
            this.menuList[2].status = true;
          }
          if (v == 'rr:upload') {
            this.menuList[3].status = true;
          }
          if (v == 'ec:upload') {
            this.menuList[4].status = true;
          }
          if (v == 'sys:setup') {
            this.system = true;
          }
          if (v.indexOf(':upload') != -1 && v.indexOf(':setup') != -1) {
            this.all = false;
          } else {
            this.all = true;
          }
        });
      } catch (ex) {
        //console.error('报错: ', ex.message)
      }
    },
    methods: {
      showOperation() {
        this.isShow = !this.isShow
      },
      openUpload(link, type, name) {
        this.$emit('showUpload', {id: 'upLoadBox', link: link, type: type, name: name})
        this.$refs.upload.dataTable(type, name)
        this.isShow = false
      },
      getYear() {
        const getYear = new Date().getFullYear().toString()
        this.selectOptionsOne = [getYear]
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
      selectShowOneHandle(){
        alert(1)
      },
      selectShowTwoHandle(){
        alert(2)
      },
      selectShowThreeHandle(){
        alert(3)
      },
      selectShowFourHandle(){
        alert(4)
      },
      getSelectData() {
        const getYear = new Date().getFullYear().toString()
        this.getYear()
        if (this.type === 0) {
          this.selectionTwo = false
          this.selectionThree = false
          this.selectionFour = false
          this.getCampaignDate(getYear)
        } else if (this.type === 1) {
          this.selectionTwo = false
          this.selectionThree = false
          this.selectionFour = false
          this.getComB2bDate(getYear)
        } else if (this.type === 2) {
          this.selectionTwo = false
          this.selectionThree = false
          this.selectionFour = false
          this.getComB2cDate(getYear)
        } else if (this.type === 3) {
          this.selectionTwo = false
          this.selectionThree = false
          this.selectionFour = false
          this.getCrmDate(getYear)
        } else if (this.type === 4) {
          this.selectionTwo = false
          this.selectionThree = false
          this.selectionFour = false
          this.getReviewRatingDate(getYear)
        } else if (this.type === 5) {
          this.selectionThree = false
          this.selectionFour = false
          this.selectionTwo = true
          this.getCampaignDate(getYear)
          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsTwo = []
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
          })
        }
      }
    },
    components: {
      DashBoard,
      TimeLine,
      UploadFile,
    },
    watch: {
      type: function (val) {
        this.getSelectData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .app-main-wrap
    position relative
    margin-left 315px
    .options-bar
      padding 20px 0
      border-radius 10px
      background-color #fff
      .options-icon-date
        font-size 22px
        color #A0A0A1
        float left
        margin 8px 18px 0 39px
      .options-menu
        position relative
        float right
        margin-right 25px
        .icon
          font-size 35px
          color #2061AE
          cursor pointer
        .dashboard-operation
          position absolute
          right -24px
          top 60px
          line-height 60px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 9999
          .a-wrap
            border-radius 10px
            overflow hidden
          a
            display block
            padding 0 25px
            border-bottom 1px solid #E8E9E9
            &:last-of-type
              border-bottom medium
            &:hover
              background-color #fff
          .icon
            font-size 27px
            color #2061AE
          .upload-icon
            font-size 32px
          span
            margin-left 15px
            font-size 20px
            color #A0A0A1
            vertical-align middle
          .triangle
            position absolute
            top -15px
            right 20px
            width 44px
            height 15px
      .dropdown-wrap
        margin-right 80px
        float left
      .styleone
        width 380px
    .dashboard-all-wrap
      margin-top 25px
</style>
