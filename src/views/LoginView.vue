<template>
<form class="row g-3" id="login">
  <h2>Login</h2>
   <div class="mb-3 row">
    <label for="inputEmail" class="col-sm-2 col-form-label">ID</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail" v-model="inputEmail">
    </div>
  </div>
    <span id="idCheck" class="form-text">
      {{loginMsg}}
    </span>
     <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호</label>
    <div class="col-sm-10">
      <input type="passWord" class="form-control" id="inputPass" v-model="inputPass" >
    </div>
  </div>
      <span id="passCheck" class="form-text">
      {{checkPass}}
    </span>

  <div class="col-12">
    <button type="botton" class="btn btn-primary" @click="startLogin">로그인</button>
  </div>

</form>
</template>

<script>
import loginApi from '@/api/LoginApi';

export default {

  data() {
    return {
      inputEmail : '',
      inputPass :'',
      loginMsg :'',
      checkPass:'',
      accessToken:'',
      refreshToken:'',
      isLogin: false,

    }
  },
   destroyed(){
     console.log("destroyed");
     sessionStorage.removeItem("mypage");
   },



  methods : {
     async startLogin(e) {
         e.preventDefault();
        console.log("startLogin");
        if (!this.inputEmail) {
            this.loginMsg = "아이디를 입력해주세요.";
            this.checkPass = '';
        } else if (!this.inputPass) {
            this.checkPass = "패스워드를 입력해주세요.";
             this.loginMsg='';
        } else {
          this.checkPass = '';
          this.loginMsg='';
          const loginInfo = {
              email : this.inputEmail,
              password : this.inputPass,
            }
            console.log(loginInfo);
            let response = await loginApi.login(loginInfo);
            console.log(response);

            if (response.status === 200) {
              this.accessToken =  response.data.data.accessToken;
              this.refreshToken = response.data.data.refreshToken;
              sessionStorage.setItem("accessToken", this.accessToken);
              sessionStorage.setItem("refreshToken", this.refreshToken);
              this.isLogin = true;
              if (sessionStorage.getItem("mypage") === "mypage") {
                sessionStorage.removeItem("mypage");
                this.$router.replace('mypage');
              } else {
                this.$router.go(-1);
              }         
            } else {
              sessionStorage.clear();
              this.isLogin = false;
            }
            
        }        
      },
     
  }
}
</script>

<style>
      #login {
        width: 600px;
        margin: auto;
      }
      #idCheck {
        color: red;
        text-align: left;
        margin-left: 130px;
      }
      #passCheck {
        color: red;
        text-align: left;
        margin-left: 130px;
      }
</style>