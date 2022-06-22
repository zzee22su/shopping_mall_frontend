<template>

<form class="row g-3" id="signup">
  <div style="text-align:center">
    <p>회원 가입 신청</p>
  </div>
 <div class="mb-3 row">
    <label for="inputId" class="col-sm-2 col-form-label">ID (email) *</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" placeholder="abcd@email.com" v-model="inputId"  @blur="checkIDvaled">
    </div>
     <span id="idCheck" class="form-text">
     {{idcheckResult}}
    </span>
  </div>

     <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호</label>
    <div class="col-sm-10">
      <input type="password" class="form-control"  v-model="inputPass">
    </div>
  </div>
   <div class="mb-3 row">
    <label for="inputPass" class="col-sm-2 col-form-label">비밀번호 확인</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" v-model="inputPasscheck"  @blur="setPasscheck">
    </div>
    <span id="passCheck" class="form-text">
      {{passcheckResult}}
    </span>
  </div>
     <div class="mb-3 row">
    <label for="inputName" class="col-sm-2 col-form-label">이름 *</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" v-model="inputName">
    </div>
    <span id="nameCheck" class="form-text">
      {{nameCheck}}
    </span>
  </div>
   <div class="mb-3 row">
    <label for="inputPhoneNumber" class="col-sm-2 col-form-label">전화번호 *</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  v-model="inputPhoneNumber">
    </div>
   </div>

     <div class="mb-3 row">
    <label for="inputAddress" class="col-sm-2 col-form-label">주소 *</label>
    
    <div class="col-sm-10">
      <div class="row g-3">
           <div class="col">
              <input type="text" id = "postcode" class="form-control" v-model="postcode" placeholder="우편번호">
          </div>
           <div class="col">
              <input type="button" class="btn btn-primary" @click="execDaumPostcode" value="우편번호 찾기">
          </div>      
      </div>
      <input type="text" class="form-control"   id = "inputAddress" v-model="inputAddress">
      <input type="text" class="form-control"   id = "extraAddress" v-model="extraAddress" placeholder="상세주소를 입력하세요.">
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
  <div class="col-12" style="text-align: center">
    <button type="button" class="btn btn-primary" @click="onSubmitSignUp">가입하기</button>
    </div>
   <div>     
    <window-popup title="Error!" :visible.sync="visible">
      <div>
        {{popupbody}}
      </div>
    </window-popup>

  </div>
</form>
</template>

<script>

import SignUpApi from '@/api/SignUpApi.js';
import WindowPopup  from '../components/PopupView.vue';
import CryptoJS from "crypto-js";
import AddressUtils from '@/api/AddressUtils';

export default {
  data() {
    return {
      inputId:'',
      inputPass:'',
      inputPasscheck:'',
      inputName:'',
      inputPhoneNumber:'',
      postcode:'',
      inputAddress:'',
      extraAddress: "",
      idcheckResult : '*',
      idCheck:false,
      checkPass:false,
      passcheckResult:'*',
      nameCheck:'',
      addressCheck:'',
      visible: false,
      popupbody:'',      
    }
  },
  components: {
    WindowPopup 
  },

  methods: {
       async checkIDvaled() {
          if (!this.inputId) {
             this.idcheckResult = "이메일은 필수입니다.";
          } else if (!this.validEmail(this.inputId)) {
             this.idcheckResult = "이메일 형식을 확인하세요.";
          } else {

           let response = await SignUpApi.idValidation(this.inputId);
           console.log(response.data.statusCode);
           console.log(response.data.data);

            if (response.status === 200) {
              if (!response.data.data) {
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
        }
     },

     validEmail: function(email) {
      console.log("valiEmail" + email)
      var re =  new RegExp(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
      return re.test(email);
    },

     setPasscheck(e) {
       e.preventDefault();
        console.log("this.inputPass : " + this.inputPass );
        console.log("this.inputPasscheck :  " + this.inputPasscheck );
       if (this.inputPass === this.inputPasscheck) {
         this.checkPass = true;
         this.passcheckResult = "비밀번호가 정상적으로 처리되었습니다."
       } else {
         this.checkPass = false;
         this.passcheckResult = "비밀번호가 다릅니다. 비밀번호를 다시 설정해주세요."
       }
     },
      async onSubmitSignUp(e) {
        e.preventDefault();
        console.log("onSubmitSignUp");
        //this.passSHA256();
       // console.log("passSHA256");

        if (!this.inputName) {
          this.popupbody = "이름란이 비었습니다. 이름을 입력해주세요."
          this.handleClickButton();
        } else if (!this.inputPhoneNumber) {
          this.popupbody = "전화번호가 없습니다. 전화번호를 입력해주세요."
          this.handleClickButton();

        } else if (!this.inputAddress) {
          this.popupbody = "주소가 없습니다. 주소를 입력해주세요."
          this.handleClickButton();

        } else {
          const body = {
            email : this.inputId,
            password : this.inputPass,
            name : this.inputName,
            phoneNumber : this.inputPhoneNumber,
            address : this.postcode +this.inputAddress + this.extraAddress,
          }
          console.log(JSON.stringify(body));
          
          const bodyForm = new FormData();
          bodyForm.append('userInfo', JSON.stringify(body));
         let result = await SignUpApi.signUp(body);

         if (result.status === 200) {
           this.$router.replace('home');
         }
          
        }
    },

    handleClickButton() {
      this.visible = !this.visible;
    },
    passSHA256(password) {
      var cipherText = CryptoJS.AES.encrypt(
          password,
            "secretkey123"
          ).toString();
        console.log(cipherText);
    },

    execDaumPostcode() {
      let me = this;
       AddressUtils.getAddress(function(s_addr) {
                me.postcode = s_addr.postNum; 
                me.inputAddress = s_addr.addr;
                me.extraAddress = s_addr.extaddr;
                console.log(s_addr);
       });

   },

  },

}

</script>

<style>

      #signup {
        width: 800px;
        margin: auto;
        font-size: 15px;
      }

      label {
        text-align: left;
        font-size: 15px;
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