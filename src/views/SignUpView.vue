<template>

<form class="row g-3" id="signup">
  <p>회원 가입 신청</p>
 <div class="mb-3 row">
    <label for="inputId" class="col-sm-2 col-form-label">ID (email) *</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" placeholder="abcd@email.com" id="inputId" v-model="inputId"  @blur="checkIDvaled">
    </div>
     <span id="idCheck" class="form-text">
     {{idcheckResult}}
    </span>
  </div>

     <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPass" v-model="inputPass"  @blur="setPass">
    </div>
  </div>
   <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호 확인</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassCheck" v-model="inputPasscheck"  @blur="setPasscheck">
    </div>
    <span id="passCheck" class="form-text">
      {{passcheckResult}}
    </span>
  </div>
     <div class="mb-3 row">
    <label for="inputName" class="col-sm-2 col-form-label">이름</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputName" v-model="inputName">
    </div>
  </div>
   <div class="mb-3 row">
    <label for="inputPhoneNumber" class="col-sm-2 col-form-label">전화번호</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputPhoneNumber"  v-model="inputPhoneNumber">
    </div>
  </div>

     <div class="mb-3 row">
    <label for="inputAddress" class="col-sm-2 col-form-label">주소</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputAddress" v-model="inputAddress">
    </div>
  </div>

  <div class="col-12">
    <div class="form-check">
      <input type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        약관에 동의 하며 가입을 신청 합니다.
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary" @click="onSubmitSignUp">가입하기</button>
  </div>
</form>
</template>

<script>
import SignUpApi from '@/api/SignUpApi.js';
export default {
  data() {
    return {
      idcheckResult : '*',
      idCheck:false,
      passSet : '',
      checkPass:false,
      passcheckResult:'*',
    }
  },


  methods: {
        checkIDvaled(e) {
          if (!this.inputId) {
             this.idcheckResult = "이메일은 필수입니다.";
          } else if (!this.validEmail(this.inputId)) {
             this.idcheckResult = "이메일 형식을 확인하세요.";
          } else {
            this.idcheckResult = "사용 가능한 ID 입니다."
            SignUpApi.idValidation(e.target.value).then(res => {
            if (res.data.statusCode === 200) {
              if (res.data.data) {
                this.idcheckResult = "사용 가능한 ID 입니다."
                this.idCheck = true;

              } else {
                  this.idcheckResult = "사용 할수 없는 ID 입니다."
                  this.idCheck = false;
              }

            } else {
              this.idcheckResult = "사용 할수 없는 ID 입니다."
              this.idCheck = false;
            }
        })
      }
     },

     validEmail: function(email) {
      console.log(email)
      var re =  new RegExp(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
      return re.test(email);
    },

     setPass(e) {
       console.log(e.target.value);
       this.setPass = e.target.value;
     },

     setPasscheck(e) {
       console.log(e.target.value);
       if (this.setPass === e.target.value) {
         this.checkPass = true;
         this.passcheckResult = "비밀번호가 정상적으로 처리되었습니다."
       } else {
         this.checkPass = false;
         this.passcheckResult = "비밀번호가 다릅니다. 비밀번호를 다시 설정해주세요."
       }
     },
      onSubmitSignUp(e) {
        e.preventDefault();
        console.log("id : " + this.inputId);
        console.log("pass : " + this.inputPass);
        console.log("Name : " + this.inputName);
        console.log("PhoneNumber : " + this.inputPhoneNumber);
        console.log("Address : " + this.inputAddress);

      }

   }
}

</script>

<style>
      #signup {
        width: 800px;
        margin: auto;
      }
      label {
        text-align: left;
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