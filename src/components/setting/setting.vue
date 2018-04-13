<template>
  <div class="app-main-wrap" style="margin-left:0;">
    <div class="userbox">
      <div class="tab">
        <ul class="clearfix">
          <li v-for="(tab, index) in tabsName" :class="{active:tab.isActive}"><a href="javascript:;" class="tab-link"
                                                                                 @click="tabsSwitch(index)">{{tab.name}}</a>
          </li>
        </ul>
      </div>
      <div class="cards box-shadow clearfix">
        <div class="tab-card" style="display: block;">
          <div class="content">
            <form action="" class="clearfix">
              <div class="search">
                <label for="">User Name</label>
                <input type="text" v-model="searchData.name" placeholder="User Name">
              </div>
              <div class="search">
                <label for="">Login Account</label>
                <input type="text" v-model="searchData.username" placeholder="Login Account">
              </div>
              <div class="search">
                <label for="">Status</label>
                <selection :selections="selectStatusOptions" @selectStatus="selectStatus"></selection>
                <!-- <select name="" id="" v-model="selectedStatus">
                  <option v-for="option in selectStatusOptions" :value="option.value">{{option.text}}</option>
                </select> -->
              </div>
              <div @click="searchUser">
                <svg-icon sign="icon-search" class="searchIcon" ></svg-icon>
              </div>
            </form>
            <div class="user-content clearfix">
              <div class="ztreebox">
                <h4>Department Organization</h4>
                <ul class="ztreeDome ztree" id="userZtree">

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
              <span id="userDisable" hidden>
                <svg-icon sign="icon-jinyong"></svg-icon>
              </span>
            </div>
          </div>
        </div>
        <div class="tab-card">
          <keep-alive>
            <role-edit v-if="roleEdit" @closeRoleEdit="switchRoleEdit" :toRoleEditId="toRoleEditId" :viewRole="viewRole" :isSave="isSave"></role-edit>
            <role v-else @openRoleEdit="switchRoleEdit" @toRoleEdit="toRoleEdit" @roleView="roleView"></role>
          </keep-alive>
        </div>
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
            <input type="text" v-if="isViewUser" class="input" name="username" @change="onInput"
                   :class="[isActive.isUserActive? 'active' : '']" v-model="data.name" placeholder="Please Username">
          </div>
          <div v-if="isViewUser">
            <label>Password</label>
            <input type="password" class="input" name="password" @change="onInput"
                   :class="[isActive.isPwdActive? 'active' : '']" minlength="6" maxlength="16" v-model="data.password"
                   placeholder="Please Password">
          </div>
          <div v-if="isViewUser">
            <label>Sure Password</label>
            <!-- <label v-if="isEdit">New Password</label> -->
            <input type="password" class="input" name="surePassword" @change="onInput"
                   :class="[isActive.isSurePwdActive? 'active' : '']" minlength="6" maxlength="16"
                   v-model="data.surePassword" placeholder="Please SurePassword">
          </div>
          <div>
            <label>Login Account</label>
            <label v-if="!isViewUser">{{userinfo.username}}</label>
            <input type="text" v-if="isViewUser" class="input" name="loginAccount" @change="onInput"
                   :class="[isActive.isLogAccActive? 'active' : '']" v-model="data.username"
                   placeholder="Please Login Account">
          </div>
          <div>
            <label>Department</label>
            <label v-if="!isViewUser">{{userinfo.org}}</label>
            <!-- <select v-if="isViewUser" name="" id="" v-model="selectedOrg">
              <option v-for="(option, index) in selectOrgOptions" :value="option.id">{{option.name}}</option>
            </select> -->
            <selection ref='user' v-if="isViewUser" :selections="selectOrgOptions" :selectedId='selectOrgOptionsId'
                       @selectUser="selectUserHandle" class="user-select"></selection>
          </div>
          <div>
            <label>Role</label>
            <label v-if="!isViewUser">{{userinfo.role}}</label>
            <!-- <select v-if="isViewUser" name="" id="" v-model="selectedRole">
              <option v-for="option in selectRoleOptions" :value="option.id">{{option.name}}</option>
            </select> -->
            <selection ref='role' v-if="isViewUser" :selections="selectRoleOptions" :selectedId="selectRoleOptionsId"
                       @selectRole="selectRoleHandle" class="user-select" :perm="isDisable"></selection>
          </div>
          <div>
            <label>Status</label>
            <div class="radio" v-if="!isViewUser">
              <label for="status1" v-if="userinfo.status == 1">
                <input type="radio" id="status1" name="newPassword" value="1" :checked=true>
                Enable
              </label>
              <label for="status2" v-if="userinfo.status == 0">
                <input type="radio" id="status2" name="newPassword" value="0" :checked=true>
                Disable
              </label>
            </div>
            <div class="radio" v-if="isViewUser">
              <label for="status1">
                <input type="radio" id="status1" name="newPassword" value="1" :checked=true v-model="data.status">
                Enable
              </label>
              <label for="status2">
                <input type="radio" id="status2" name="newPassword" value="0" v-model="data.status">
                Disable
              </label>
            </div>
          </div>
        </div>
        <div class="submit-btn">
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
  import Role from '../../components/role/role'
  import RoleEdit from '../../components/role/edit'

  let layerId,newCount = 1;
  export default {
    name: "setting",
    data() {
      return {
        USERINFO: null,
        all: false,
        isShow: false,
        table: null,
        isViewUser: false,
        isCreate: true,
        isDisable: false,
        userinfo: {
          name: '',
          username: '',
          org: '',
          role: '',
          status: ''
        },
        searchData:{
          name:'',
          username:'',
          status:'',
          orgid:''
        },
        active: false,
        selectedStatus: '',
        selectStatusOptions: ['All', 'Enable', 'Disable'],
        tabsName: [
          {
            name: 'USER',
            isActive: true
          },
          {
            name: 'ROLE',
            isActive: false
          },
          {
            name: 'TARGET',
            isActive: false
          }
        ],
        data: {
          name: '',
          password: '',
          surePassword: '',
          username: '',
          status: 1,
          orgid: '',
          roleIds: '',
          id: ''
        },
        isEdit: true,
        selectedRole: '',
        selectedOrg: '',
        selectRoleOptions: [],
        selectOrgOptions: [],
        selectRoleOptionsId: [],
        selectOrgOptionsId: [],
        isActive: {
          isUserActive: false,
          isPwdActive: false,
          isSurePwdActive: false,
          isLogAccActive: false,
        },
        ztreeNodeData:[],
        nodeSetting:{
          view:{
            showIcon: true,
            addHoverDom:this.addHoverDom,
            removeHoverDom: this.removeHoverDom
          },
          data: {
            simpleData: {
              enable: true,
              pIdKey: "parentId"
            }
          },
          edit: {
            enable: true
          },
          callback:{
            onClick: this.getOrgId,
            onRename: this.onRename,
            beforeRemove: this.beforeRemove
          }
        },
        roleEdit:false,
        toRoleEditId:'',
        viewRole:false,
        isSave:true
      }
    },
    mounted() {
      this.isLogin();
      this.userTable();
      this.removeUser();
      this.viewUser();
      this.editUser();
      this.userEnable();
      this.userDisable();
      this.$nextTick(()=>{
        this._initZtree()
      })
    },
    methods: {
      isLogin() {
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
      tabsSwitch(tabIndex) {
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
        that.table = $("#userTable").DataTable({
          searching: false,
          lengthChange: false,
          autoWidth: false,
          info: false,
          bDestroy: true,
          ordering: false,
          pagingType: "simple_numbers",
          pageLength: 6,
          "ajax": (data, callback, settings) => {
            post(xhrUrls.USER_SEARCH, that.searchData).then((res) => {
              if (res.data.data.data.length <= 6) {
                $('#userTable_paginate').hide()
              }
              callback(res.data.data);
            }).catch((err) => {
              console.log(err);
            })
          },
          columns: [{
            data: "name",
            render: function (data, type, row) {
              return '<div style="text-align: center; font-weight: 400;">' + data + '</div>';
            }
          },
            {
              data: "username",
              render: function (data, type, row) {
                return '<div style="text-align: center;">' + data + '</div>';
              }
            },
            {
              data: "status",
              render: function (data, type, row) {
                if (data == 1) {
                  return '<div style="text-align: center;">Enable</div>';
                } else {
                  return '<div style="text-align: center;">Disable</div>';
                }
              }
            },
            {
              data: null,
              render: function (data, type, row) {
                let operColor = ''
                let operClassName = ''
                let operTitle = ''
                let html = ''
                if (row.status != 1) {
                  operColor = '#D7D7D7'
                  operClassName = 'userEnable'
                  operTitle = 'Enable'
                } else {
                  operColor = '#74A5D4'
                  operClassName = 'userDisable'
                  operTitle = 'Disable'
                }
                if(row.id != 1){
                  html += '<a title="DELETE" style="color:red; font-size:18px; cursor: pointer;;margin-left: 10px" class="removeUser" data-id="' + row.id + '">' + $("#deluser").html() + '</a>'
                  html += '<a title="'+ operTitle +'" style="color:'+ operColor +'; font-size:18px; cursor: pointer;;margin-left: 10px" class="'+ operClassName +'" data-id="' + row.id + '">' + $("#userDisable").html() + '</a>'
                }
                return '<div style="text-align: center;">' +
                  '<a title="VIEW" style="color:#2061ae; font-size:18px; cursor: pointer" class="viewUser" data-id="' + row.id + '">' + $("#viewuser").html() + '</a>' +
                  '<a title="EDIT" style="color:green; font-size:18px; cursor: pointer;margin-left: 10px" class="editUser" data-id="' + row.id + '">' + $("#edituser").html() + '</a>'
                  + html +
                  '</div>';
              }
            }
          ]

        });
      },
      //ztree
      _initZtree(){
        get(xhrUrls.USER_ORG_ZTREE).then(res=>{
          let nodeData = res.data.data
          nodeData.forEach((v, i)=>{
            this.ztreeNodeData.push({name:v.name, id:v.id, parentId:v.parentId})
          })
          $.fn.zTree.init($("#userZtree"), this.nodeSetting, this.ztreeNodeData).expandAll(true);
        }).catch(err=>console.log(err))
      },
      //修改名称
      onRename(event, treeId, treeNode, isCancel){
        event.stopImmediatePropagation();
        post(xhrUrls.ORG_UPDATE, {name:treeNode.name, id:treeNode.id}).then(res=>{
          if(res.data.code == 200){
            layer.msg('Modify the success !', {
              time: 2000,
              skin: 'fontColor'
            }, function(index) {
              layer.close(index);
            })
          }else{
            layer.msg('Modify the failure !', {
              time: 2000,
              skin: 'fontColor'
            }, function(index) {
              layer.close(index);
            })
          }
        }).catch(err=>console.log(err))
      },

      //删除org
      beforeRemove(event, treeId, treeNode, isCancel){
        let id = treeId.id;
        let isDeled;
        layer.confirm('Do you delete this organization?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function (index) {
            layer.close(index);
            get(xhrUrls.ORG_DEL + '/' + id).then((res) => {
              if (res.data.code == 200) {
                isDeled = true
                layer.msg('Delete the success !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              } else {
                isDeled = false
                layer.msg('Delete failed !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            }, function (index) {
              isDeled = false
              layer.close(index);
            })
          }, function (index) {
            layer.close(index);
            isDeled = false
          })
        return isDeled
      },

      // 增加节点
      addHoverDom(treeId, treeNode){
        if(treeNode.level == 0){
          var sObj = $("#" + treeNode.tId + "_span");
          $('.remove').hide();
          if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
          var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='add node' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_"+treeNode.tId);
          if (btn) btn.bind("click", function(){
            var zTree = $.fn.zTree.getZTreeObj("userZtree");
            post(xhrUrls.ORG_SAVE, {name:"New Org" + newCount , parentId: treeNode.id}).then(res=>{
              if(res.data.code == 200){
                layer.msg('Add organization success !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
                zTree.addNodes(treeNode, {id:(100 + newCount), pId:1, name:"New Org" + (newCount++)});
              }else{
                layer.msg('Add organization failure !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            }).catch(err=>console.log(err))
            return false;
          });
        }
      },
      removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
      },

      //ztreeClick
      getOrgId(event, treeId, treeNode){
        this.data.orgid = treeNode.id;
        if(treeNode.id == 1){
          this.searchData.orgid = ''
        }else{
          this.searchData.orgid = treeNode.id
        }
        this.userTable()
      },
      //searchList
      searchUser(){
        this.userTable()
      },
      //删除
      removeUser() {
        let that = this;
        $(document).delegate('.removeUser', 'click', function (event) {
          event.stopImmediatePropagation();
          event.preventDefault();
          var id = $(this).attr("data-id");
          layer.confirm('Do you delete this user?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function (index) {
            layer.close(index);
            get(xhrUrls.USER_DEL + '/' + id).then((res) => {
              if (res.data.code == 200) {
                layer.msg('Delete the success !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                  that.userTable()
                })
              } else {
                layer.msg('Delete failed !', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            }, function (index) {
              layer.close(index);
            })
          })

        });
      },

      userEnable(){
        let that = this
        $(document).on('click', '.userEnable', function () {
          let id = $(this).data('id')
          layer.confirm('Do you enable this User?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(xhrUrls.USER_ENABLE +'/'+ id).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Successfully Enable!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.userTable()
                })
              } else {
                layer.confirm(res.data.errMsg, {
                  title: 'Prompt information',
                  btn: ['Cancel'],
                })
              }
            })
          })
        })
      },

      userDisable() {
        let that = this
        $(document).on('click', '.userDisable', function () {
          let id = $(this).data('id')
          layer.confirm('Do you disable this User?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(xhrUrls.USER_DISABLE +'/'+id).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Successfully Enable!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.userTable()
                })
              } else {
                layer.confirm(res.data.errMsg, {
                  title: 'Prompt information',
                  btn: ['Cancel'],
                })
              }
            })
          })
        })
      },
      //编辑用户
      editUser() {
        let that = this;
        $(document).delegate('.editUser', 'click', function (event) {
          event.stopImmediatePropagation();
          event.preventDefault();
          var id = $(this).attr("data-id");
          if(id == 1){
            that.isDisable = true
          }
          that.isViewUser = true
          that.isEdit = false
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
            if (res.data.code == 200) {
              that.data.name = res.data.user.name
              that.data.username = res.data.user.username
              that.selectedOrg = res.data.org.name
              if (res.data.role) {
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
          }).catch(err => console.log(err))
        })
      },


      //查看用户
      viewUser() {
        let that = this;
        $(document).delegate('.viewUser', 'click', function (event) {
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
          }).catch(err => console.log(err))
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
        this.selectRoleOptionsId = []
        this.selectOrgOptionsId = []
        this.isActive.isUserActive = false;
        this.isActive.isPwdActive = false;
        this.isActive.isSurePwdActive = false;
        this.isActive.isLogAccActive = false;
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
          resize: false,
        })
      },
      showCreate(obj) {
        this.layerOpen('user')
        this.isViewUser = true
        let roleId = this.data.roleIds;
        let orgid = this.data.orgid;
        post(xhrUrls.ROLE_SEARCH, {}).then(res => {
          let data = res.data.data.data;
          data.forEach((v, i) => {
            this.selectRoleOptions.push(v.name);
            this.selectRoleOptionsId.push(v.id);
            if (roleId == v.id) {
              this.$refs.role.nowIndex = i
            }
          });
        }).catch(err => console.log(err))

        post(xhrUrls.ORG_SEARCH, {}).then(res => {
          let data = res.data.data;
          data.forEach((v, i) => {
            this.selectOrgOptions.push(v.name);
            this.selectOrgOptionsId.push(v.id);
            if (orgid == v.id) {
              this.$refs.user.nowIndex = i
            }
          });
        }).catch(err => console.log(err))

      },
      selectStatus(val){
        switch (val) {
          case 'Enable':
            this.searchData.status = 1
            break;
          case 'Disable':
            this.searchData.status = 0
            break;
          default:
            this.searchData.status = ""
            break;
        }
      },
      selectUserHandle(val) {
        this.data.orgid = val.id
      },
      selectRoleHandle(val) {
        this.data.roleIds = val.id
      },

      onInput() {
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
      submit() {

        let that = this
        if (this.data.name == '' && this.data.password == '' && this.data.surePassword == '' && this.data.username == '') {
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
        if (this.data.name != '' && this.data.password != '' && this.data.surePassword != '' && this.data.username != '' && this.data.password == this.data.surePassword) {
          console.log(this.data)
          if (!this.isEdit == true) {
            // this.data.id = id
            post(xhrUrls.USER_EDIT, this.data)
              .then(res => {
                if (res.data.code == 200) {
                  layer.msg('Updata user success !', {
                    time: 2000,
                    skin: 'fontColor'
                  }, function (index) {
                    that.isShow = false
                    that.closeLayerButton()
                    that.userTable();
                    layer.close(index);
                  })
                } else {
                  layer.msg('Updata user failed !', {
                    time: 2000,
                    skin: 'fontColor'
                  }, function (index) {
                    that.isActive.isUserActive = true;
                    layer.close(index);
                  })
                }
              }).catch(err => console.log(err));
          } else {
            post(xhrUrls.USER_SAVE, this.data)
              .then(res => {
                if (res.data.code == 200) {
                  layer.msg('Create user success !', {
                    time: 2000,
                    skin: 'fontColor'
                  }, function (index) {
                    that.isShow = false
                    that.closeLayerButton()
                    that.userTable();
                    layer.close(index);
                  })
                } else {
                  layer.msg('Create user failed !', {
                    time: 2000,
                    skin: 'fontColor'
                  }, function (index) {
                    that.isActive.isUserActive = true;
                    layer.close(index);
                  })
                }
              })
              .catch(err => console.log(err));
          }
        }
      },
      switchRoleEdit(){
        this.roleEdit = !this.roleEdit
        this.viewRole = false
        this.toRoleEditId = ''
      },
      toRoleEdit(val){
        this.roleEdit = !this.roleEdit
        this.viewRole = false
        this.isSave = false
        this.toRoleEditId = val.id
      },
      roleView(val){
        this.roleEdit = !this.roleEdit
        this.viewRole = true
        this.toRoleEditId = val.id
      }
    },
    components: {
      UploadFile,
      Role,
      RoleEdit
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
      ul > li
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
            color #717071
            font-size 30px
            margin-left 30px
            height 40px
            line-height 40px
            cursor pointer
          .user-content
            width 100%
            margin-top 30px
            .ztreebox
              width 20%
              height 450px
              float left
              border 1px solid #eaeaea
              border-radius 5px
              padding 0
              .ztreeDome
                max-height 380px
                overflow auto
              h4
                height 55px
                line-height 55px
                text-align center
                color #fff
                border-bottom 1px solid #1f61ae
                font-size 20px
                font-weight 400
                background #1f61ae
                border-radius 5px
            .tables
              margin-left 22%
              .user-create
                color #fff
                font-size 22px
                e-pos(top:50%, y:-50%)
              .create
                border 1px solid #1f61ae
                border-radius 5px
                height 55px
                cursor pointer
                padding-left 20px
                background #1f61ae
                line-height 55px
                position relative
                .newUser
                  margin-left 35px
                  color #fff
                  line-height 55px
                  display inline-block
                  position absolute;
                  margin-top -3px
                span
                  color #fff
                  font-size 20px
              .user-table
                // margin-top 20px
                position relative
                width 100%

  #user
    width 700px
    .tables-title
      position: relative
      padding-left: 45px
      font-size: 30px
      line-height: 80px
      height 80px
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

<style lang="stylus" rel="stylesheet/stylus">
  .user-select
    .dropdown-menu
      max-height 100px
      overflow auto
</style>
