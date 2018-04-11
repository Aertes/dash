<template>
  <div class="app-main-wrap">
    <div class="options-bar box-shadow clearfix">
			<h3 class="title">SYSTEM SETTING</h3>
      <div v-if="all" class="options-menu">
        <div>
          <svg-icon sign="icon-more"></svg-icon>
        </div>
        <!-- <div class="dashboard-operation box-shadow" >
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
        </div> -->
      </div>
    </div>

    <div class="userbox">
      <div class="tab">
        <ul class="clearfix">
          <li v-for="(tab, index) in tabsName" :class="{active:tab.isActive}"><a href="javascript:;" class="tab-link" @click="tabsSwitch(index)" >{{tab.name}}</a></li>
        </ul>
      </div>
      <div class="cards clearfix">
        <div class="tab-card" style="display: block;">
          <div class="content">
            <form action="" class="clearfix">
              <div class="search">
                <label for="">User Name</label>
                <input type="text">
              </div>
              <div class="search">
                <label for="">Login Account</label>
                <input type="text">
              </div>
              <div class="search">
                <label for="">Status</label>
                <selection  :selections="selectOptions"></selection>
                <!-- <select name="" id="">
                  <option value="all">All</option>
                  <option value="0">Enable</option>
                  <option value="1">Disable</option>
                </select> -->
              </div>
            </form>
            <div class="user-content clearfix">
              <div class="ztree">
                <h4>Department Organization</h4>
                <ul class="ztreeDome">

                </ul>
              </div>
              <div class="tables">
                <div class="create" @click="showCreate">
                    <svg-icon sign="icon-user" class="user-icon"></svg-icon>
                    <span class="newUser">New user</span>
                </div>
                <div class="user-table">
                  <table id="userTable" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Login Account</th>
                        <th>Status</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>  
        <div class="tab-card">2</div>  
        <div class="tab-card">3</div>  
      </div>
    </div>

    <div class="tables-wrap" id="user" v-show="isShow">
      <div class="tables-title">
			  <span class="titles">CREATE USER</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
			<form action="" autocomplete="off">
          <div class="resg">
              <div>
									<label>User Name</label>
									<input type="text" class="input" name="username" @change="onInput" :class="[isActive.isUserActive? 'active' : '']" v-model="data.name">
							</div>
              <div>
									<label>Password</label>
									<input type="password" class="input" name="password" @change="onInput" :class="[isActive.isPwdActive? 'active' : '']" minlength="6" maxlength="16" v-model="data.password">
							</div>
              <div>
									<label>Sure Password</label>
									<input type="password" class="input" name="surePassword" @change="onInput" :class="[isActive.isSurePwdActive? 'active' : '']" minlength="6" maxlength="16" v-model="data.surePassword">
							</div>
							<div>
									<label>Login Account</label>
									<input type="text" class="input" name="loginAccount" @change="onInput" :class="[isActive.isLogAccActive? 'active' : '']" v-model="data.username">
							</div>
              <div>
									<label>Department</label>
									<selection  :selections="selectOrgOptions"  @selectShowOne="selectShowOneHandle"></selection>
							</div>
              <div>
									<label>Role</label>
									<selection  :selections="selectRoleOptions"  @selectShowTwo="selectShowTwoHandle"></selection>
							</div>
							<div>
									<label>Status</label>
                  <div class="radio">
                      <label for="status1">
									      <input type="radio" id="status1" name="newPassword" value="1" :checked=true  v-model="data.status">
                        Enable
                      </label>
                      <label for="status2">
									      <input type="radio" id="status2" name="newPassword" value="0"  v-model="data.status">
                        Disable
                      </label>
                  </div>
							</div>
          </div>
          <div class="submit-btn">
            <button type="button" class="confirm" @click="submit">confirm</button>
					  <button type="button" class="cancel" @click="closeLayerButton">cancel</button>
          </div>
			</form>
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

  let layerId
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
        ],
        table:null,
        tableData:{},
        active:false,
        selectOptions:['All', 'Enable', 'Disable'],
        tabsName:[
          {
            name:'USER',
            isActive:true
          },
          {
            name:'ROLE',
            isActive:false
          },
          {
            name:'TARGET',
            isActive:false
          }
        ],
        data: {
          name:'',
          password:'',
          surePassword:'',
          username:'',
          status: '',
          orgid:'036d330f55f447acae9d7d78044e3add',
          roleIds:''
        },
        selectRoleOptions:[],
        selectOrgOptions:[],
        isActive:{
          isUserActive: false,
          isPwdActive: false,
          isSurePwdActive: false,
          isLogAccActive: false,
        }
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {
      this.isLogin();
      this.userTable();
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
      },
      tabsSwitch (tabIndex){
        let tabCardCollection = document.querySelectorAll('.tab-card'),
            len = tabCardCollection.length;
        for (let i = 0; i < len; i++) {
          tabCardCollection[i].style.display = 'none';
          this.tabsName[i].isActive = false;  
        }
        this.tabsName[tabIndex].isActive = true;  
        tabCardCollection[tabIndex].style.display = "block";
      },
      userTable(type, name) {
				var that = this;
				// that.Data.channel = type;
				that.table = $("#userTable").DataTable({
					searching: false,
					lengthChange: false,
					autoWidth: false,
					info: false,
					bDestroy: true,
					ordering: false,
					pagingType: "simple_numbers",
					pageLength: 5,
					"ajax": (data, callback, settings) => {
						post(xhrUrls.USER_SEARCH, that.tableData).then((res) => {
							if (res.data.data.data.length <= 5) {
								$('#fileTable_paginate').hide()
							}
							callback(res.data.data);
						}).catch((err) => {
							console.log(err);
						})
					},
					columns: [{
							data: "name",
							render: function(data, type, row) {
								return '<div style="text-align: center; font-weight: 400;">' + data + '</div>';
							}
						},
						{
							data: "username",
							render: function(data, type, row) {
								return '<div style="text-align: center;">' + data + '</div>';
							}
						},
						{
							data: "status",
							render: function(data, type, row) {
                if(data == 1){
                  return '<div style="text-align: center;">Enable</div>';
                }else{
                  return '<div style="text-align: center;">Disable</div>';
                }
							}
						},
						{
							data: null,
							render: function(data, type, row) {
								return '<div style="text-align: center;" title="DELETE"><a style="color:red; font-size:18px; cursor: pointer;" class="removeRecord" data-id="' + row.id + '">' + $("#operate").html() + '</a></div>';
							}
						}
					]
	
				});
      },
      
      //关闭上传弹窗
			closeLayerButton() {
        layer.close(layerId)
        this.data.name = ''
        this.data.password = ''
        this.data.surePassword = ''
        this.data.username = ''
        this.data.orgid = ''
        this.selectRoleOptions = []
        this.selectOrgOptions = []
      },
      layerOpen(id) {
        layerId = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`),
          resize:false,
        })
      },
      showCreate(obj){
        this.layerOpen('user')
        post(xhrUrls.ROLE_SEARCH, {}).then(res=>{
          let data = res.data.data;
          data.forEach((v, i) => {
            this.selectRoleOptions.push(v.name);
          });
        }).catch(err=>console.log(err))
        
        post(xhrUrls.ORG_SEARCH, {}).then(res=>{
          let data = res.data.data;
          console.log(data);
          data.forEach((v, i) => {
            this.selectOrgOptions.push(v.name);
          });
        }).catch(err=>console.log(err))

      },
      selectShowOneHandle(val){
        this.data.orgid = val
      },
      selectShowTwoHandle(val){
        this.data.roleIds = val
      },
      onInput(){
        if (this.data.name != '') {
          this.isActive.isUserActive = false;
        }
        if (this.data.password != '') {
          this.isActive.isPwdActive = false;
        }
        if (this.data.surePassword != '') {
          this.isActive.isSurePwdActive = false;
        }
        if (this.data.username != '') {
          this.isActive.isLogAccActive = false;
        }
      },
      submit(){
        let that = this
        if(this.data.name == '' && this.data.password == '' && this.data.surePassword == '' && this.data.username == ''){
          this.isActive.isUserActive = true;
          this.isActive.isPwdActive = true;
          this.isActive.isSurePwdActive = true;
          this.isActive.isLogAccActive = true;
        }
        if (this.data.name == '') {
          this.isActive.isUserActive = true;
        }
        if (this.data.password == '') {
          this.isActive.isPwdActive = true;
        }
        if (this.data.surePassword == '') {
           this.isActive.isSurePwdActive = true;
        }
        if (this.data.username == '') {
          this.isActive.isLogAccActive = true;
        }
        if (this.data.password != this.data.surePassword) {
          this.isActive.isSurePwdActive = true;
        }
        if (this.data.name != '' && this.data.password != '' && this.data.surePassword != '' && this.data.username != '' &&  this.data.password == this.data.surePassword) {
          post(xhrUrls.USER_SAVE, this.data)
            .then(res => {
              if (res.data.code == 200) {
                layer.msg('Create user success !', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
                  that.isShow = false
                  that.closeLayerButton()
                  that.userTable();
									layer.close(index);
								})
              } else {
                layer.msg('Create user failed !', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
                  that.isActive.isUserActive = true;
									layer.close(index);
								})
              }
            })
            .catch(err => {
              console.log(err);
            });
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

.userbox
  .tab
    margin-top 40px
    ul>li
      float left
      background url("../../assets/img/tab.png") no-repeat left bottom
      border-top-left-radius 10px
      border-top-right-radius 10px
      &.active
          background url("../../assets/img/tab_active.jpg") no-repeat center
          transition: all .3s linear
      .tab-link
        color #fff;
        width 200px
        height 60px
        display block
        text-align center
        line-height 60px
        font-size 22px
  .cards
    background #fff
    width 100%
    padding 40px
    border-top-right-radius 10px
    border-bottom-left-radius 10px
    border-bottom-right-radius 10px
    .tab-card
      float left
      display none
      .content
        width 100%
        form
          width 100%
        .search
          float left
          .dropdown-wrap
            display inline-block
            width 200px
            height 35px
            line-height 35px
            .dropdown-show
              height 35px
              line-height 35px
          label 
            color #717071
            font-size 22px
            margin-right 15px
            line-height 35px
            display inline-block
          input 
            margin-right 30px
            appearance none
            border 1px solid #E2DFDE
            border-radius 5px
            width 200px
            height 35px
            line-height 35px
            padding 0 10px
        .user-content
          width 100%
          margin-top 30px
          .ztree
            width 40%
            height 600px
            float left
            border 1px solid #b3b1b2
            border-radius 5px
            h4
             height 55px
             line-height 55px
             text-align center
             color #838383
             border-bottom 1px solid #b3b1b2
             font-size 20px
             font-weight 400
          .tables
            margin-left 42%
            width 100%
            .create
              border 1px solid #b3b1b2
              border-radius 5px
              height 55px
              line-height 55px
              cursor pointer
              padding-left 20px
              span 
                color #838383
                font-size 20px
            .user-table
              margin-top 20px
#user
  width 700px
  .tables-title
    position: relative
    padding-left: 45px
    font-size: 30px
    line-height: 80px
    height 60px
    color: #a0a0a1
    .icon 
      e-pos(top:35%, y:-50%)
      right: 25px
      font-size: 30px
      color: #A0A0A1
      cursor: pointer
  .resg
    padding 0 60px 0 50px
    div
      height 50px
      line-height 50px
      width 100%
      margin 20px 0
      .dropdown-wrap
        display inline-block
        width 60%
        height 50px
        line-height 50px
        .dropdown-show
          height 50px
          line-height 50px
          input
            height 50px
            line-height 50px
        .dropdown-menu
          overflow-y scroll
          max-height 80px
      label
        font-size 22px
        display inline-block
        width 40%
        float left
        color #a0a0a1
      .radio
        label
         width 20%
      .input 
        width 60%
        height 100%
        padding-left 10px
        padding-right 35px
        appearance none
        border 1px solid #E2DFDE
        border-radius 5px
        font-size 21px
        float right
      .active 
        border-color: #e78b70
  .submit-btn
    text-align center
    margin-bottom 30px
    button 
      height 40px
      background-color #2061AE
      border-radius 10px
      color #fff
      border medium
      outline none
      cursor pointer
      padding 0 20px
      font-size 24px
    .confirm
      margin-right 10px
    .cancel
      margin-left 10px
      background-color #ccc
  
</style>
