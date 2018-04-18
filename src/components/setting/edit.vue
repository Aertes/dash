<template>
    <div class="tables-wrap" id="user" v-show="isShow">
      <div class="tables-title">
        <span class="titles">CREATE USER</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
      <form action="" autocomplete="off">
        <div class="resg">
          <div>
            <label>User Name</label>
            <label class="userName" v-model="userinfo.name" v-show="!isViewUser">{{userinfo.name}}</label>
            <input type="text" v-show="isViewUser" class="input" name="username" @change="onInput"
                   :class="[isActive.isUserActive? 'active' : '']" v-model="userData.name">
          </div>
          <div v-show="isViewUser">
            <label>Password</label>
            <input type="password" class="input" name="password" @change="onInput"
                   :class="[isActive.isPwdActive? 'active' : '']" minlength="6" v-model="userData.password">
          </div>
          <div v-show="isViewUser">
            <label>Repeated Password</label>
            <input type="password" class="input" name="surePassword" @change="onInput"
                   :class="[isActive.isSurePwdActive? 'active' : '']" minlength="6"
                   v-model="userData.surePassword">
          </div>
          <div>
            <label>Account ID</label>
            <label v-show="!isViewUser">{{userinfo.username}}</label>
            <input type="text" v-show="isViewUser" :disabled='isUpdata' class="input" name="loginAccount" @change="onInput"
                   :class="[isActive.isLogAccActive? 'active' : '']" v-model="userData.username">
          </div>
          <div>
            <label>Department</label>
            <label v-show="!isViewUser">{{userinfo.org}}</label>
            <selection ref='user' v-show="isViewUser" :selections="selectOrgOptions" :selectedId='selectOrgOptionsId'
                       @selectUser="selectUserHandle" class="user-select"></selection>
          </div>
          <div>
            <label>System Role</label>
            <label v-show="!isViewUser">{{userinfo.role}}</label>
            <selection ref='role' v-show="isViewUser" :selections="selectRoleOptions" :selectedId="selectRoleOptionsId"
                       @selectRole="selectRoleHandle" class="user-select" :perm="isDisable"></selection>
          </div>
          <div>
            <label>Account Status</label>
            <div class="radio" v-show="!isViewUser">
              <label for="status1" v-show="userinfo.status == 1">
                <!-- <input type="radio" id="status1" name="newPassword" value="1" :checked=true> -->
                Enable
              </label>
              <label for="status2" v-show="userinfo.status == 0">
                <!-- <input type="radio" id="status2" name="newPassword" value="0" :checked=true> -->
                Disable
              </label>
            </div>
            <div class="radio" v-show="isViewUser">
              <label for="status1">
                <input type="radio" id="status1" name="newPassword" value="1" :checked=true v-model="userData.status">
                Enable
              </label>
              <label for="status2">
                <input type="radio" id="status2" name="newPassword" value="0" v-model="userData.status">
                Disable
              </label>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <button type="button" v-show="isViewUser" class="confirm" @click="submit">Submit</button>
          <button type="button" class="cancel" @click="closeLayerButton">Cancel</button>
        </div>
      </form>
    </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post} from '../../assets/config/http'

  let layerId, newCount = 1;
  export default {
    name: "setting",
    data() {
      return {
        isShow: false,
        isViewUser: false,
        isDisable: false,
        userId:'',
        userinfo: {
          name: '',
          username: '',
          org: '',
          role: '',
          status: ''
        },
        active: false,
        userData: {
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
        isUpdata:false,
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
        }
      }
    },
    props:['userView'],
    mounted() {
      this.viewUser();
      this.editUser();
    },
    methods: {
      
      //编辑用户
      editUser() {
        let that = this;
        $(document).delegate('.editUser', 'click', function (event) {
          event.stopImmediatePropagation();
          event.preventDefault();
          var id = $(this).data('id');
          if (id == 1) {
            that.isDisable = true
          }
          that.isViewUser = true
          that.isEdit = false
          that.isUpdata = true
          $('.titles').html('EDIT USER')
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
            if (res.data.code == 200) {
              that.userData.name = res.data.user.name
              that.userData.username = res.data.user.username
              that.selectedOrg = res.data.org.name
              if (res.data.role) {
                that.selectedRole = res.data.role.name
                that.userData.roleIds = res.data.role.id
              }
              that.userData.status = res.data.user.status
              that.userData.id = id
              that.userData.orgid = res.data.org.id
              that.showCreate()
            } else {
              console.log('err')
            }
          }).catch(err => console.log(err))
        })
      },

      //查看用户
      viewUser() {
        let that = this
        $(document).on('click','.viewUser', function (event) {
          event.stopImmediatePropagation();
          event.preventDefault();
          $('.titles').html('USER DETAILS')
          $('.cancel').html('Back').css('background-color', '#00aeea')
          var id = $(this).data('id');
          that.userId = id
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
            if (res.data.code == 200) {
              that.$set(that.userinfo, 'name', res.data.user.name)
              that.$set(that.userinfo, 'username', res.data.user.username)
              that.$set(that.userinfo, 'org', res.data.org.name)
              that.$set(that.userinfo, 'role', res.data.role.name)
              that.$set(that.userinfo, 'status', res.data.user.status)
              that.isViewUser = false
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
        this.userData.name = ''
        this.userData.password = ''
        this.userData.surePassword = ''
        this.userData.username = ''
        this.userData.orgid = ''
        this.userinfo.name=''
        this.userinfo.username=''
        this.userinfo.org=''
        this.userinfo.role=''
        this.userinfo.status=''
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
        if(this.isEdit){
          $('.titles').html('CREATE USER')
          this.isUpdata = false
        }else{
          $('.titles').html('EDIT USER')
          this.isEdit = true
        }
        $('.cancel').html('Cancel').css('background-color', 'orange')
        let roleId = this.userData.roleIds;
        let orgid = this.userData.orgid;
        post(xhrUrls.ROLE_SEARCH, {}).then(res => {
          let data = res.data.data.data;
          data.forEach((v, i) => {
            this.selectRoleOptions.push(v.name);
            this.selectRoleOptionsId.push(v.id)
            if (i == 0 && !roleId) {
              this.userData.roleIds = v.id
            }
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
            if (i == 0 && !orgid) {
              this.userData.orgid = v.id
            }
            if (orgid == v.id) {
              this.$refs.user.nowIndex = i
            }
          });
        }).catch(err => console.log(err))
      },
      selectStatus(val) {
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
        this.userData.orgid = val.id
      },
      selectRoleHandle(val) {
        this.userData.roleIds = val.id
      },

      onInput() {
        if (this.userData.name != '') {
          this.isActive.isUserActive = false;
        }
        if (this.userData.password != '') {
          this.isActive.isPwdActive = false;
        }
        if (this.userData.surePassword != '') {
          this.isActive.isSurePwdActive = false;
        }
        if (this.userData.username != '') {
          post(xhrUrls.USER_VALID_USERNAME, this.userData.username).then(res=>{
            let data = res.data
            if(!data){
              this.isActive.isLogAccActive = true;
              return false
            }else{
              this.isActive.isLogAccActive = false;
              return false
            }
          }).catch(err=>console.log(err))
        }
      },
      submit() {
        let that = this;
        let canSubmit = true;
        console.log(this.selectedRole)
        if (this.userData.name == '') {
          this.isActive.isUserActive = true;
          canSubmit = false;
        }
        if (this.userData.name == '') {
          this.isActive.isUserActive = true;
          canSubmit = false;
        }
        if (this.userData.username == '') {
          this.isActive.isLogAccActive = true;
          canSubmit = false;
        }
        if (this.isUpdata) {
          //修改用户时不填代表不修改密码
          if ((this.userData.surePassword != '' || this.userData.password != '')
            && this.userData.password != this.userData.surePassword) {
            this.isActive.isPwdActive = true;
            this.isActive.isSurePwdActive = true;
            canSubmit = false;
          }

          if (!canSubmit) {
            return false;
          }

          // this.data.id = id
          post(xhrUrls.USER_EDIT, this.userData)
            .then(res => {
              if (res.data.code == 200) {
                that.isShow = false
                layer.msg('Update success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  that.closeLayerButton()
                  that.userTable();
                  layer.close(index);
                })
              } else {
                layer.msg('Edit failure!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  that.isActive.isUserActive = true;
                  layer.close(index);
                })
              }
            }).catch(err => console.log(err));
        } else {

          //创建用户时密码必填
          if (this.userData.password == '' || this.userData.surePassword == ''
            || this.userData.password != this.userData.surePassword) {
            this.isActive.isPwdActive = true;
            this.isActive.isSurePwdActive = true;
            canSubmit = false;
          }

          if (!canSubmit) {
            return false;
          }

          post(xhrUrls.USER_SAVE, this.userData)
            .then(res => {
              if (res.data.code == 200) {
                that.isShow = false
                layer.msg('Create user success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  that.closeLayerButton()
                  that.userTable();
                  layer.close(index);
                })
              } else {
                this.isActive.isLogAccActive = true;
                layer.msg(res.data.errMsg, {
                  time: 2000,
                  skin: 'fontColor'
                })
              }
            })
            .catch(err => console.log(err));
        }
      },
    },
    watch:{
      userId:function(){
        alert(1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  #user
    width 700px
    .tables-title
      position: relative
      padding-left: 45px
      font-size: 30px
      line-height: 100px
      height 100px
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
          &:disabled
            border 0
            background #fff
        .active
          border-color: #e78b70
    .submit-btn
      text-align center
      margin 50px 80px
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
        background-color orange
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .user-select
    .dropdown-menu
      max-height 100px
      overflow auto
</style>
