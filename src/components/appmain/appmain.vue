<template>
  <div class="app-main-wrap">

    <img v-if='goDown' src="../../assets/img/down.gif" alt="" class="goDown">
    <img v-else='goUp' src="../../assets/img/up.gif" alt="" class="goUp">

    <div class="options-bar box-shadow clearfix">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>

      <selection v-show="selectionOne" :selections="selectOptionsOne" @selectShowOne="selectShowOneHandle"></selection>

      <selection v-show="selectionTwo" :selections="selectOptionsTwo" @selectShowTwo="selectShowTwoHandle" ref="selectionTwoBox"></selection>

      <selection v-show="selectionThree" :selections="selectOptionsThree" @selectShowThree="selectShowThreeHandle" ref="selectionThreeBox" class="styleone"></selection>

      <selection v-show="selectionFour" :selections="selectOptionsFour" @selectShowFour="selectShowFourHandle" ref="selectionFourBox"></selection>

      <div v-if="all" class="options-menu">
        <div>
          <svg-icon sign="icon-more"></svg-icon>
        </div>
        <div class="dashboard-operation box-shadow" >
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <a href="javascript:;" v-for="(item,index) in menuList"
               @click="openUpload(item.link, item.type, item.name)">
              <svg-icon v-if="item.status" sign="icon-upload" class="upload-icon"></svg-icon>
              <span v-if="item.status">{{item.name}}</span>
            </a>
            <router-link v-if="system" to="/setting">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>SYSTEM SETTING</span>
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
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  let EC_CATEGORY = xhrUrls.EC_CATEGORY

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
        selectOneVal: '',
        goDown: true,
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
      },


      camOneCategoryId() {
        return this.$store.state.camOneCategoryId
      },
      camCategoryId() {
        return this.$store.state.camCategoryId
      },
      camCompaignId() {
        return this.$store.state.camCompaignId
      },
      camWeekId() {
        return this.$store.state.camWeekId
      },
      comMarketTypeId() {
        return this.$store.state.comMarketTypeId
      },
      rrOneChannelId() {
        return this.$store.state.rrOneChannelId
      },
      rrChannelId() {
        return this.$store.state.rrChannelId
      },
      ecCategoryId() {
        return this.$store.state.ecCategoryId
      }
    },
    mounted() {

      this.goUpDown()

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
      selectShowOneHandle(val) {

        this.$store.commit('yearVoluation', val)

      },
      selectShowTwoHandle(val) {

        this.getSelectData(val,'SI')

      },
      pageinNowIndex() {
        this.pagNowIndex = !this.pagNowIndex
      },
      selectShowThreeHandle(val) {

        if(val == undefined){
          val = this.camCompaign
        }

        this.$store.commit('camCompaignVoluation', val)

        this.$store.commit('camCompaignIdVoluation', this.$refs.selectionThreeBox.nowIndex)

        if (this.camCompaign != null || this.camCompaign != undefined) {
          const url = `${CAM_GETPARAMETER}?category=${this.camCategory}&campaign=${this.camCompaign}`
          this.selectionFour = true
          get(url).then(res => {
            let data = res.data.data
            this.selectOptionsFour = ['All']
            data.forEach((val) => {
              this.selectOptionsFour.push(val)
            })
            this.$refs.selectionFourBox.nowIndex = 0
          })
        } else {
          this.selectionFour = false
        }

      },
      selectShowFourHandle(val) {

        if(val == undefined){
          val = this.camCompaign
        }

        this.$store.commit('camWeekVoluation', val)

        this.$store.commit('camWeekIdVoluation', this.$refs.selectionFourBox.nowIndex)

      },
      getSelectData(val,page) {

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

          if(val == undefined){
            val = this.camOneCategory
          }

          this.$store.commit('camOneCategoryVoluation', val)

          this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsTwo = ['All']
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
            //this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
          })

        } else if (this.type === 6) {

          if(this.selectionFour){
            this.selectionFour = true
          }else{
            this.selectionFour = false
          }

          this.selectionThree = false

          this.selectionTwo = true

          if(val == undefined){
            val = this.camCategory
          }

          this.$store.commit('camCategoryVoluation', val)

          this.$store.commit('camCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)

          /*this.$store.commit('camCompaignVoluation', null)

          this.$store.commit('camWeekVoluation', null)*/

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsTwo = ['All']
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
            //this.$store.commit('camCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
          })

          if (this.camCategory != null || this.camCategory != undefined) {
            const url = `${CAM_GETPARAMETER}?category=${this.camCategory}`
            this.selectionThree = true
            get(url).then(res => {
              let data = res.data.data
              this.selectOptionsThree = ['All']
              data.forEach((val) => {
                this.selectOptionsThree.push(val)
              })
              if(this.selectOneVal == this.camCategory){
                this.$refs.selectionThreeBox.nowIndex = this.camCompaignId
              }else{
                this.$refs.selectionThreeBox.nowIndex = 0
              }

            })
          }

        } else if (this.type === 7) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionTwo = true

          if(val == undefined){
            val = this.comMarketType
          }

          this.$store.commit('comMarketTypeVoluation', val)

          this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionTwoBox.nowIndex)

          this.getCampaignDate(getYear)

          get('http://rap2api.taobao.org/app/mock/9789/GET//example/1523272844171').then(res => {
            let data = res.data.markettype
            this.selectOptionsTwo = []
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
          })

          /*this.$nextTick(() => {
            this.selectOptionsTwo = ['B2C', 'B2B']
            this.$refs.selectionTwoBox.nowIndex = 0
          })*/

          //this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionTwoBox.nowIndex)

        } else if (this.type === 8) {

          this.selectionTwo = false

          this.selectionThree = false

          this.selectionFour = false

          this.getCampaignDate(getYear)

        } else if (this.type === 9) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionTwo = true

          if(val == undefined){
            val = this.rrOneChannel
          }

          this.$store.commit('rrOneChannelVoluation', val)

          this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)

          this.getCampaignDate(getYear)

          get('http://rap2api.taobao.org/app/mock/9789/GET//example/1523272844171').then(res => {
            let data = res.data.channel
            this.selectOptionsTwo = ['All']
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
          })

          /*this.$nextTick(() => {
            this.selectOptionsTwo = ['All', 'JD', 'Tmall']
            this.$refs.selectionTwoBox.nowIndex = 0
          })*/

          //this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)

        } else if (this.type === 10) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionTwo = true

          if(val == undefined){
            val = this.rrChannel
          }

          this.$store.commit('rrChannelVoluation', val)

          this.$store.commit('rrChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)

          this.getCampaignDate(getYear)

          get('http://rap2api.taobao.org/app/mock/9789/GET//example/1523272844171').then(res => {
            let data = res.data.channel
            this.selectOptionsTwo = ['All']
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
          })

          /*this.$nextTick(() => {
            this.selectOptionsTwo = ['All', 'JD', 'Tmall']
            this.$refs.selectionTwoBox.nowIndex = 0
          })*/

          //this.$store.commit('rrChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)

        } else if (this.type === 11) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionTwo = true

          if(val == undefined){
            val = this.ecCategory
          }

          this.$store.commit('ecCategoryVoluation', val)

          this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)

          this.getCampaignDate(getYear)

          get(EC_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsTwo = ['All']
            data.forEach((val) => {
              this.selectOptionsTwo.push(val)
            })
            //this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
          })

        }
      },
      goUpDown() {
        if (this.type == 0) {
          this.goDown = true
        } else if (this.type == 11) {
          this.goDown = false
        } else {
          this.goDown = false
        }
      }
    },
    components: {
      DashBoard,
      TimeLine,
      UploadFile,
    },
    watch: {
      type: function () {

        if (this.type == 5) {
          //alert('camOne'+' : '+this.camOneCategoryId)
          this.$refs.selectionTwoBox.nowIndex = this.camOneCategoryId
        }else if (this.type == 6) {

          //alert('camCategory'+' : '+this.camCategoryId)
          this.$refs.selectionTwoBox.nowIndex = this.camCategoryId

          //alert('camCompaign'+' : '+this.camCompaignId)
          if(this.camCompaignId > 0) {
            this.selectionFour = true
          }

          this.selectOneVal = this.camCategory

          this.$refs.selectionThreeBox.nowIndex = this.camCompaignId

          //alert('camWeek'+' : '+this.camWeekId)
          this.$refs.selectionFourBox.nowIndex = this.camWeekId

        }else if(this.type == 7){
          //alert('comMarketType'+' : '+this.comMarketTypeId)
          this.$refs.selectionTwoBox.nowIndex = this.comMarketTypeId
        }else if(this.type == 9){
          //alert('rrOneChannel'+' : '+this.rrOneChannelId)
          this.$refs.selectionTwoBox.nowIndex = this.rrOneChannelId
        }else if(this.type == 10){
          //alert('rrChannel'+' : '+this.rrChannelId)
          this.$refs.selectionTwoBox.nowIndex = this.rrChannelId
        }else if(this.type == 11){
          //alert('ecCategory'+' : '+this.ecCategoryId)
          this.$refs.selectionTwoBox.nowIndex = this.ecCategoryId
        }

        this.getSelectData()

        this.goUpDown()

        /*this.getSelectData(null)

        this.selectOptionsTwo = []

        this.$nextTick(()=>{
          this.$refs.selectionTwoBox.nowIndex = 0
        })*/

        /*else if(this.type == 6){
          this.selectOptionsTwo = []
          this.$refs.selectionTwoBox.nowIndex = 0
        }else if(this.type == 7){
          this.selectOptionsTwo = []
          this.$refs.selectionTwoBox.nowIndex = 0
        }else if(this.type == 8){
          this.selectOptionsTwo = []
          this.$refs.selectionTwoBox.nowIndex = 0
        }else if(this.type == 9){
          this.selectOptionsTwo = []
          this.$refs.selectionTwoBox.nowIndex = 0
        }else if(this.type == 10){
          this.selectOptionsTwo = []
          this.$refs.selectionTwoBox.nowIndex = 0
        }else if(this.type == 11){
          this.selectOptionsTwo = []
          this.$refs.selectionTwoBox.nowIndex = 0
        }*/

      },

      /*camOneCategory: function () {
        this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        //his.$refs.selectionTwoBox.nowIndex = this.camOneCategoryId
      },
      camCategory: function () {
        this.$store.commit('camCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        //this.$refs.selectionTwoBox.nowIndex = this.camCategoryId
      },
      camCompaign: function () {
        this.$store.commit('camCompaignIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.camCompaignId
      },
      camWeek: function () {
        this.$store.commit('camWeekIdVoluation', this.$refs.selectionFourBox.nowIndex)
        //this.$refs.selectionFourBox.nowIndex = this.camWeekId
      },
      comMarketType: function () {
        this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        //this.$refs.selectionTwoBox.nowIndex = this.comMarketTypeId
      },
      rrOneChannel: function () {
        this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        //this.$refs.selectionTwoBox.nowIndex = this.rrOneChannelId
      },
      rrChannel: function () {
        this.$store.commit('rrChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        //this.$refs.selectionTwoBox.nowIndex = this.rrChannelId
      },
      ecCategory: function () {
        this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        //this.$refs.selectionTwoBox.nowIndex = this.ecCategoryId
      },*/

      camOneCategoryId: function () {
        //this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        this.$refs.selectionTwoBox.nowIndex = this.camOneCategoryId
      },
      camCategoryId: function () {
        //this.$store.commit('camCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        this.$refs.selectionTwoBox.nowIndex = this.camCategoryId
      },
      camCompaignId: function () {
        //this.$store.commit('camCompaignIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.camCompaignId
      },
      camWeekId: function () {
        //this.$store.commit('camWeekIdVoluation', this.$refs.selectionFourBox.nowIndex)
        this.$refs.selectionFourBox.nowIndex = this.camWeekId
      },
      comMarketTypeId: function () {
        //this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        this.$refs.selectionTwoBox.nowIndex = this.comMarketTypeId
      },
      rrOneChannelId: function () {
        //this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        this.$refs.selectionTwoBox.nowIndex = this.rrOneChannelId
      },
      rrChannelId: function () {
        //this.$store.commit('rrChannelIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        this.$refs.selectionTwoBox.nowIndex = this.rrChannelId
      },
      ecCategoryId: function () {
        //this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionTwoBox.nowIndex)
        this.$refs.selectionTwoBox.nowIndex = this.ecCategoryId
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
        font-size 28px
        color #A0A0A1
        float left
        margin 4px 18px 0 39px
      .options-menu
        position absolute
        right 0
        margin-right 25px
        width 50px
        height 60px
        z-index 5000
        padding-left 15px
        &:hover .dashboard-operation
          display block
        .icon
          font-size 35px
          color #2061AE
          cursor pointer
        .dashboard-operation
          display none
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
        margin-right 30px
        float left
      .styleone
        width 350px
    .dashboard-all-wrap
      margin-top 25px
  .goUp,
  .goDown
    e-pos(left:50%, x:-50%, top:50%, y:-50%)
    margin-top 400px
    width 20px
    z-index 99999
</style>
