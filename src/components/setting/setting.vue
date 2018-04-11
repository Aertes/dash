<template>
  <div class="app-main-wrap">
    <div class="options-bar box-shadow clearfix">
			<h3 class="title">SYSTEM SETTING</h3>
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
            <router-link v-if="system" to="/">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>SYSTEM SETTING</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix dashboard-all-wrap">
      <upload-file ref='upload'></upload-file>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import UploadFile from '../../components/upload/upload'
  import {get, post, uploadPost} from '../../assets/config/http'
  import {getSessionItem} from "../../assets/config/storage.js"

  const OVDateUrl = xhrUrls.OV_DATE
  const CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  const CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  const EC_CATEGORY = xhrUrls.EC_CATEGORY

  export default {
    name: "setting",
    data() {
      return {
        USERINFO: null,
        all: false,
				isShow: false,
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
      }
    },
    mounted() {
			this.isLogin();
      
    },
    methods: {
			isLogin(){
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
			}
    },
    components: {
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
        margin-right 50px
        float left
      .styleone
        width 350px
    .dashboard-all-wrap
      margin-top 25px
	.title
		color #2061AE
		padding-left 20px
</style>
