<template>
  
  <div class="bg">
    <div class="form-wrapper">
      <h2>WELCOME!</h2>
      <form class="submit box-shadow" action="" autocomplete="off">
        <div class="input username">
          <input type="text" @keyup.enter="submit" name='username' @change="onInput"
                :class="[isUserActive? 'active' : '']" v-model="loginDate.username" placeholder="USER NAME"
                autocomplete="off">
          <svg-icon sign="icon-user"></svg-icon>
        </div>
        <div class="input password">
          <input type="password" @keyup.enter="submit" name='password' @change="onInput"
                :class="[isPassActive? 'active' : '']" v-model="loginDate.password" placeholder="PASSWORD">
          <svg-icon sign="icon-Cord"></svg-icon>
        </div>
        <div class="input code">
          <input type="text" @keyup.enter="submit" name='code' maxlength="4" @change="onInput"
                :class="[isCodeActive? 'active' : '']" v-model="loginDate.code" placeholder="VERIFICATION CODE">
          <img class="code-img" :src="codeUrl" alt="">
          <span @click="getCode">
                      <svg-icon class="code" sign="icon-refresh"></svg-icon>
                  </span>
        </div>
        <button type="button" @click="submit">LOGIN</button>
      </form>

    </div>
  </div>

  
</template>

<script type="text/ecmascript-6">
  import xhrUrls from "../../assets/config/xhrUrls";
  import { post } from "../../assets/config/http"
  import { setSessionItem } from "../../assets/config/storage.js"

  export default {
    name: "login",
    data() {
      return {
        isShow: false,
        isUserActive: false,
        isPassActive: false,
        isCodeActive: false,
        userInfo: {},
        codeUrl: "",
        baseUrl: "",
        loginDate: {
          username: "",
          password: "",
          code: "",
          withCredentials: true
        },
        USERINFO: {}
      };
    },
    computed: {},
    methods: {
      getCode() {
        this.codeUrl = BASE_URL + xhrUrls.CODE + "?" + new Date().getTime();
      },
      submit() {
        if (this.loginDate.username == "" & this.loginDate.password == "" & this.loginDate.code == "") {
          this.isUserActive = true;
          this.isPassActive = true;
          this.isCodeActive = true;
        }
        if (this.loginDate.username == "") {
          this.isUserActive = true;
        }
        if (this.loginDate.password == "") {
          this.isPassActive = true;
        }
        if (this.loginDate.code == "") {
          this.isCodeActive = true;
        }
        if (this.loginDate.username != "" & this.loginDate.password != "" & this.loginDate.code != "") {
          $(".loading").show();
          $(".mark").show();
          post(BASE_URL + xhrUrls.LOGIN, this.loginDate)
            .then(res => {
              if (res.data.code == 200) {
                setTimeout(() => {
                  $(".loading").hide();
                  $(".mark").hide();
                  // this.$router.push({path: "/dashborad"});
                  setSessionItem('USERINFO', JSON.stringify(res.data))
                }, 1000);
              } else {
                setTimeout(() => {
                  $(".loading").hide();
                  $(".mark").hide();
                  this.codeUrl = BASE_URL + xhrUrls.CODE + "?" + new Date().getTime();
                  switch (res.data.code) {
                    case 201:
                      this.isCodeActive = true;
                      break;
                    default:
                      this.isUserActive = true;
                      this.isPassActive = true;
                      break;
                  }
                }, 1000);
              }
            })
            .catch(err => {
              setTimeout(() => {
                $(".loading").hide();
                $(".mark").hide();
              }, 1000);
              this.isActive = true;
              console.log(err);
            });
        }
      },
      onInput() {
        if (this.loginDate.username != '') {
          this.isUserActive = false;
        }
        if (this.loginDate.password != '') {
          this.isPassActive = false;
        }
        if (this.loginDate.code != '') {
          this.isCodeActive = false;
        }
      }
    },
    mounted() {
      this.getCode();
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';
	.bg{
		background:url('../../assets/img/bg.jpg') no-repeat
		background-size: cover;
		margin 0
	}
  .form-wrapper {
    width: 600px;
    // height: 515px;
    // e-pos(top: 50%, y: -50%, left: 50%, x:-50%);
    transform: scale(0.85);
	padding-bottom: 7%;
    h2 {
      margin: 0 0 30px;
      text-align: center;
      font-size: 34px;
      color: #1f61ae;
      // font-weight: 400;
	  padding-top 20px;
    }

    .submit {
      background-color: #fff;
      text-align: center;
      border-radius: 10px;
      padding: 35px 0 55px;
      .input {
        padding: 20px 60px;
        position: relative;

        .code {
          cursor: pointer;
          position: relative;
        }
        span {
          e-pos(top:50%, y:-50%);
          right: 80px;
          width: 50px;
          height: 50px;
          cursor: pointer;

          .icon {
            right: 0;
          }
        }

        .icon {
          e-pos(top:50%, y:-50%);
          right: 80px;
          color: #1f61ae;
          font-size: 26px;
        }

        .code-img {
          e-pos(top:50%, y:-50%);
          right: 120px;
          height: 40px;
          width: 100px;
          text-align: center;
        }

        .active {
          border-color: #e78b70;
        }

        input {
          width: 100%;
          height: 55px;
          border: 1px solid #6c6b6b;
          border-radius: 10px;
          padding: 3px 15px 0;
          font-size: 24px;
          outline: none;
        }
        input:
        :-moz-placeholder, input:-moz-placeholder, input:-ms-input-placeholder, input::-webkit-input-placeholder {
          color: #a2a1a2;
        }
      }

      button {
        width: 270px;
        height: 50px;
        background-color: #1f61ae;
        color: #ffffff;
        border: 0;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 30px;
        font-size: 26px;
        outline: none;
        padding-top 1px
      }
    }
  }
</style>

