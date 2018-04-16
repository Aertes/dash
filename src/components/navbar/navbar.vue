<template>
  <div class="nav-bar-wrap clearfix">
    <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></div>
    <h1>One China Digital Performance Dashboard</h1>
    <div class="user-info">
      <div class="after-login">
        <div class="userHover" v-if="USERINFO">
          <span class="user-name">{{userName}}</span>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
        </div>
        <div class="userHover" v-else @click="showOperation">
          <span class="user-name">{{userName}}</span>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
        </div>
        <div v-if="USERINFO"  class="user-operation box-shadow" >
          <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
          <div class="a-wrap">
            <a @click="showEditPass">
              <svg-icon sign="icon-user"></svg-icon>
              <span>PROFILE</span></a>
            <a @click="settingShow">
              <svg-icon sign="icon-setting"></svg-icon>
              <span>SYSTEM SETTINGS</span></a>
            <a @click="outLogin">
              <svg-icon sign="icon-turn-off"></svg-icon>
              <span>SIGN OUT</span></a>
          </div>
        </div>
      </div>
    </div>

    <div class="tables-wrap" id="editPassword" v-show="isShow">
      <div class="tables-title">
			  <span class="title">PROFILE</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
			<form action="" autocomplete="off">
          <div class="resg">
              <div>
									<label>User Name</label>
									<label for="">{{data.username}}</label>
							</div>
							<div>
									<label>Old Password</label>
									<input type="password" name="oldPassword" @change="onInput" :class="[isOldActive? 'active' : '']" v-model="data.password">
							</div>
							<div>
									<label>New Password</label>
									<input type="password" name="newPassword" @change="onInput" :class="[isNewActive? 'active' : '']" minlength="6" v-model="data.newPassword">
							</div>
							<div>
									<label>Sure Password</label>
									<input type="password" name="surePassword" @change="onInput" :class="[isSureActive? 'active' : '']" minlength="6"  v-model="data.surePassword">
							</div>
          </div>
          <div class="submit-btn">
            <button type="button" class="confirm" @click="submit">Confirm</button>
					  <button type="button" class="cancel" @click="closeLayerButton">Cancel</button>
          </div>
			</form>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSessionItem} from "../../assets/config/storage.js"
  import {removeSessionItem} from "../../assets/config/storage.js"
  import {get, post} from "../../assets/config/http"
  import xhrUrls from '../../assets/config/xhrUrls'
  let layerId
  export default {
    name: "NavBar",
    data() {
      return {
        isShow: false,
        isErr: false,
        userName: 'Login',
        USERINFO: null,
        isOldActive:false,
        isNewActive:false,
        isSureActive:false,
        name: '',
        errMsg:'',
        data:{
          password:'',
          newPassword:'',
          surePassword:'',
          id:'',
          username: ''
        }
      }
    },
    methods: {
      showOperation() {
        if (!this.USERINFO) {
          this.$router.push({path: "/"});
        }
      },
      outLogin() {
        get(xhrUrls.LOGOUT).then((res) => {
          this.$router.push({path: "/"});
          this.USERINFO = removeSessionItem('USERINFO')
        }).catch((err) => {
          console.log(err);
        })
      },
      layerOpen(id) {
        layerId = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`)
        })
      },
      showEditPass(obj){
        this.layerOpen('editPassword')
      },
      //关闭上传弹窗
			closeLayerButton() {
        layer.close(layerId)
        this.data.password = ''
        this.data.newPassword = ''
        this.data.surePassword = ''
        this.isOldActive=false
        this.isNewActive=false
        this.isSureActive=false
			},
      onInput() {
        if (this.data.password != '') {
          this.isOldActive = false;
        }
        if (this.data.newPassword != '') {
          this.isNewActive = false;
        }
        if (this.data.surePassword != '') {
          this.isSureActive = false;
        }
      },
      submit(){
        let that = this
        if(this.data.password == '' && this.data.newPassword == '' && this.data.surePassword == ''){
          this.isOldActive = true;
          this.isNewActive = true;
          this.isSureActive = true;
        }
        if (this.data.password == '') {
          this.isOldActive = true;
        }
        if (this.data.newPassword == '') {
          this.isNewActive = true;
        }
        if (this.data.surePassword == '') {
          this.isSureActive = true;
        }
        if (this.data.newPassword != this.data.surePassword) {
          this.isNewActive = true;
          this.isSureActive = true;
        }
        if (this.data.password != '' && this.data.newPassword != '' && this.data.surePassword != '' && this.data.newPassword == this.data.surePassword) {
          post(xhrUrls.EDIT_PWD, this.data)
            .then(res => {
              if (res.data.code == 200) {
                layer.msg('Password update success!', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
									layer.close(index);
									that.$router.push({path: "/"});
                  that.USERINFO = removeSessionItem('USERINFO')
                  layer.close(layerId)
								})
              } else {
                that.isOldActive=true
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      settingShow(){
        this.$Hub.$emit('settingShow')
      }
    },
    mounted() {
      const USERINFO = JSON.parse(getSessionItem('USERINFO'))
      this.USERINFO = USERINFO
      try {
        this.userName = USERINFO.name;
        this.data.id = USERINFO.id;
        this.data.username = USERINFO.username;
      } catch (ex) {
        //console.error('报错: ', ex.message)
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';
  .nav-bar-wrap
    margin-bottom 19px
    line-height 100px
    .logo
      float left
      width 198px
      height 100px
      // margin-left 45px
      img
        width 100%
        height 100%
    h1
      float left
      margin-left 60px
      font-size 37px
      color #a0a0a1
      font-weight normal
      text-shadow: 5px 5px 5px #bbbbbb;
    .user-info
      float right
      color #2061AE
      .before-login
        font-size 33px
      .after-login
        position relative
        cursor pointer
        &:hover .user-operation
          display block
        .user-name
          margin-right 24px
          font-size 27px
          vertical-align top
        .user-icon
          font-size 27px
        .user-operation
          position absolute
          right -24px
          top 90px
          line-height 60px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 99999
          display none
          .a-wrap
            border-radius 10px
            overflow hidden
          a
            display block
            padding 0 25px
            &:nth-of-type(2)
              border-top 1px solid #E8E9E9
              border-bottom 1px solid #E8E9E9
            &:hover
              background-color #fff
          .icon
            font-size 27px
            color #2061AE
          span
            margin-left 15px
            font-size 20px
            color #A0A0A1
            vertical-align middle
          .triangle
            position absolute
            top -15px
            right 16px
            width 44px
            height 15px
#editPassword
  width 700px
  .tables-title
    position: relative
    padding-left: 45px
    font-size: 30px
    line-height: 80px
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
      height 50px
      line-height 50px
      width 100%
      margin 20px 0
      label
        font-size 22px
        display inline-block
        width 40%
        float left
        color #a0a0a1
      input
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
