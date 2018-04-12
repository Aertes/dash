<template>
  <div class="app-main-wrap" style="margin-left:0;">
    <div class="userbox">
      <div class="tab">
        <ul class="clearfix">
          <li v-for="(tab, index) in tabsName" :class="{active:tab.isActive}"><a href="javascript:;" class="tab-link" @click="tabsSwitch(index)" >{{tab.name}}</a></li>
        </ul>
      </div>
      <div class="cards box-shadow clearfix">
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
                <selection  :selections="selectStatusOptions"></selection>
                <!-- <select name="" id="" v-model="selectedStatus">
                  <option v-for="option in selectStatusOptions" :value="option.value">{{option.text}}</option>
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
                    <svg-icon sign="icon-tianjia" class="user-create"></svg-icon>
                    <span class="newUser">New user</span>
                </div>
                <div class="user-table clearfix">
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
              <span id="deluser" hidden>
                <svg-icon sign="icon-trash"></svg-icon>
              </span>
              <span id="edituser" hidden>
                <svg-icon sign="icon-edit"></svg-icon>
              </span>
              <span id="viewuser" hidden>
                <svg-icon sign="icon-chakan01"></svg-icon>
              </span>
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
                  <label v-if="!isViewUser">{{userinfo.name}}</label>
									<input type="text" v-if="isViewUser" class="input" name="username" @change="onInput" :class="[isActive.isUserActive? 'active' : '']" v-model="data.name" placeholder="Please Username">
							</div>
              <div v-if="isViewUser">
									<label>Password</label>
									<input type="password"  class="input" name="password" @change="onInput" :class="[isActive.isPwdActive? 'active' : '']" minlength="6" maxlength="16" v-model="data.password" placeholder="Please Password">
							</div>
              <div v-if="isViewUser">
									<label>Sure Password</label>
									<!-- <label v-if="isEdit">New Password</label> -->
									<input type="password" class="input" name="surePassword" @change="onInput" :class="[isActive.isSurePwdActive? 'active' : '']" minlength="6" maxlength="16" v-model="data.surePassword" placeholder="Please SurePassword">
							</div>
							<div>
									<label>Login Account</label>
                  <label v-if="!isViewUser">{{userinfo.username}}</label>
									<input type="text" v-if="isViewUser" class="input" name="loginAccount" @change="onInput" :class="[isActive.isLogAccActive? 'active' : '']" v-model="data.username" placeholder="Please Login Account">
							</div>
              <div>
									<label>Department</label>
                  <label v-if="!isViewUser">{{userinfo.org}}</label>
                  <!-- <select v-if="isViewUser" name="" id="" v-model="selectedOrg">
                    <option v-for="(option, index) in selectOrgOptions" :value="option.id">{{option.name}}</option>
                  </select> -->
									<selection ref='user' v-if="isViewUser"  :selections="selectOrgOptions" :selectedId='selectOrgOptionsId'  @selectUser="selectUserHandle"></selection>
							</div>
              <div>
									<label>Role</label>
                  <label v-if="!isViewUser">{{userinfo.role}}</label>
                  <!-- <select v-if="isViewUser" name="" id="" v-model="selectedRole">
                    <option v-for="option in selectRoleOptions" :value="option.id">{{option.name}}</option>
                  </select> -->
									<selection ref='role'  v-if="isViewUser" :selections="selectRoleOptions" :selectedId="selectRoleOptionsId"  @selectRole="selectRoleHandle"></selection>
							</div>
							<div>
									<label>Status</label>
                  <div class="radio" v-if="!isViewUser">
                      <label for="status1" v-if="userinfo.status == 1">
									      <input type="radio" id="status1" name="newPassword" value="1" :checked=true >
                        Enable
                      </label>
                      <label for="status2" v-if="userinfo.status == 0">
									      <input type="radio" id="status2" name="newPassword" value="0"  :checked=true>
                        Disable
                      </label>
                  </div>
                  <div class="radio" v-if="isViewUser">
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
          <div class="submit-btn" >
            <button type="button" v-if="isViewUser" class="confirm" @click="submit">confirm</button>
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
        isViewUser: false,
        isCreate:true,
        userinfo:{
          name:'',
          username:'',
          org:'',
          role: '',
          status: ''
        },
        active:false,
        selectedStatus: '',
        selectStatusOptions:['All','Enable','Disable'],
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
          status: 1,
          orgid:'036d330f55f447acae9d7d78044e3add',
          roleIds:'',
          id:''
        },
        isEdit:true,
        selectedRole:'',
        selectedOrg:'',
        selectRoleOptions:[],
        selectOrgOptions:[],
        selectRoleOptionsId:[],
        selectOrgOptionsId:[],
        isActive:{
          isUserActive: false,
          isPwdActive: false,
          isSurePwdActive: false,
          isLogAccActive: false,
        }
      }
    },
    mounted() {
      this.isLogin();
      this.userTable();
      this.removeUser();
      this.viewUser();
      this.editUser();
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
      userTable() {
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
                return '<div style="text-align: center;">'+
                          '<a title="VIEW" style="color:#2061ae; font-size:18px; cursor: pointer" class="viewUser" data-id="' + row.id + '">' + $("#viewuser").html() + '</a>'+
                          '<a title="EDIT" style="color:green; font-size:18px; cursor: pointer;margin-left: 10px" class="editUser" data-id="' + row.id + '">' + $("#edituser").html() + '</a>'+
                          '<a title="DELETE" style="color:red; font-size:18px; cursor: pointer;;margin-left: 10px" class="removeUser" data-id="' + row.id + '">' + $("#deluser").html() + '</a>'+
                        '</div>';
							}
						}
					]
	
				});
      },

      //删除
      removeUser() {
				let that = this;
				$(document).delegate('.removeUser', 'click', function(event) {
					event.stopImmediatePropagation();
					event.preventDefault();
          var id = $(this).attr("data-id");
					layer.confirm('Do you delete this user?', {
						title: 'Prompt information',
						btn: ['Confirm', 'Cancel'],
					}, function(index) {
						layer.close(index);
						get(xhrUrls.USER_DEL + '/' + id).then((res) => {
							if (res.data.code == 200) {
								layer.msg('Delete the success !', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
									layer.close(index);
									that.userTable()
								})
							} else {
								layer.msg('Delete failed !', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
									layer.close(index);
								})
							}
						}, function(index) {
							layer.close(index);
						})
					})
	
				});
      },
      
      //编辑用户
      editUser(){
        let that = this;
        $(document).delegate('.editUser', 'click', function(event) {
          event.stopImmediatePropagation();
          event.preventDefault();
          var id = $(this).attr("data-id");
          that.isViewUser = true
          that.isEdit = false
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
							if (res.data.code == 200) {
                that.data.name = res.data.user.name
                that.data.username = res.data.user.username
                that.selectedOrg = res.data.org.name
                if(res.data.role){
                  that.selectedRole = res.data.role.name
                  that.data.roleIds = res.data.role.id
                }
                that.data.status = res.data.user.status
                that.data.id = id
                that.data.orgid = res.data.org.id
                that.showCreate()
							} else {
                console.log('err')
							}
						}).catch(err=>console.log(err))
        })
      },

      //查看用户
      viewUser(){
        let that = this;
        $(document).delegate('.viewUser', 'click', function(event) {
          event.stopImmediatePropagation();
          event.preventDefault();
          that.isViewUser = false
          // that.isEdit = false
          var id = $(this).attr("data-id");
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
							if (res.data.code == 200) {
                that.userinfo.name = res.data.user.name
                that.userinfo.username = res.data.user.username
                that.userinfo.org = res.data.org.name
                that.userinfo.role = res.data.role.name
                that.userinfo.status = res.data.user.status
                that.layerOpen('user')
							} else {
                console.log('err')
							}
						}).catch(err=>console.log(err))
        })
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
        this.isViewUser = true
        let roleId = this.data.roleIds;
        let orgid = this.data.orgid;
        post(xhrUrls.ROLE_SEARCH, {}).then(res=>{
          let data = res.data.data;
          data.forEach((v, i) => {
            this.selectRoleOptions.push(v.name);
            if(roleId == v.id){
              this.$refs.role.nowIndex = i
            }
          });
        }).catch(err=>console.log(err))
        
        post(xhrUrls.ORG_SEARCH, {}).then(res=>{
          let data = res.data.data;
          console.log(data);
          data.forEach((v, i) => {
            this.selectOrgOptions.push(v.name);
            if(orgid == v.id){
              this.$refs.user.nowIndex = i
            }
          });
        }).catch(err=>console.log(err))

      },
      selectUserHandle(val){
        alert(val.val)
        //this.data.orgid = val
      },
      selectRoleHandle(val){
        
        alert(this.$refs.role.nowIndex )
        //this.data.roleIds = val
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
          console.log(this.data)
          if(!this.isEdit == true){
            // this.data.id = id
            post(xhrUrls.USER_EDIT, this.data)
            .then(res => {
              if (res.data.code == 200) {
                layer.msg('Updata user success !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  that.isShow = false
                  that.closeLayerButton()
                  that.userTable();
                  layer.close(index);
                })
              } else {
                layer.msg('Updata user failed !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  that.isActive.isUserActive = true;
                  layer.close(index);
                })
              }
            }).catch(err => console.log(err));
          }else{
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
            .catch(err => console.log(err));
          }
        }
      }
    },
    components: {
      UploadFile,
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
      width 100%
      .content
        width 100%
        form
          width 100%
        .search
          float left
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
          input,select
            margin-right 30px
            appearance none
            border 1px solid #E2DFDE
            border-radius 5px
            width 200px
            height 40px
            line-height 40px
            padding 0 10px
          
        .user-content
          width 100%
          margin-top 30px
          .ztree
            width 20%
            height 450px
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
              background rgba(241, 240, 240, 0.7)
          .tables
            margin-left 22%
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
            .user-table
              margin-top 20px
              position relative
              width 100%
              
#user
  width 700px
  .tables-title
    position: relative
    padding-left: 45px
    font-size: 30px
    line-height: 60px
    height 60px
    color: #a0a0a1
    .icon 
      e-pos(top:50%, y:-50%)
      right: 25px
      font-size: 30px
      color: #A0A0A1
      cursor: pointer
  .resg
    padding 0 60px 0 50px
    div
      height 40px
      line-height 40px
      width 100%
      margin 20px 0
      .dropdown-wrap
        position relative
        display inline-block
        width 60%
        height 50px
        outline none
        .dropdown-show
          position relative
          width 100%
          height 50px
          cursor pointer
          .arrow-down
            e-pos(top:50%, y:-50%)
            right 10px
            font-size 20px
            color #A0A0A1
          input
            width 100%
            height 100%
            padding-left 10px
            padding-right 35px
            appearance none
            border 1px solid #E2DFDE
            border-radius 5px
            color #A0A0A1
            font-size 21px
            &:disabled
              background-color #fff
        .dropdown-menu
          position absolute
          top 37px
          width 100%
          font-size: 21px
          color #A0A0A1
          line-height 40px
          background-color #fff
          border 1px solid #E2DFDE
          border-radius 5px
          overflow-y scroll
          z-index 10
          max-height 80px
          li
            padding-left 10px
            border-bottom 1px solid #eaeaea
            cursor: pointer
            &:last-of-type
              border-bottom medium
            &:hover
              background-color #F5F6F8
      label
        font-size 22px
        display inline-block
        width 40%
        float left
        color #a0a0a1
      .radio
        input
          vertical-align -1px
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
