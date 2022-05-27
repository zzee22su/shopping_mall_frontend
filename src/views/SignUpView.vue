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
      <input type="password" class="form-control" id="inputPass" v-model="inputPass">
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
    <label for="inputName" class="col-sm-2 col-form-label">이름 *</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputName" v-model="inputName">
    </div>
    <span id="nameCheck" class="form-text">
      {{nameCheck}}
    </span>
  </div>
   <div class="mb-3 row">
    <label for="inputPhoneNumber" class="col-sm-2 col-form-label">전화번호 *</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputPhoneNumber"  v-model="inputPhoneNumber">
    </div>
   </div>

     <div class="mb-3 row">
    <label for="inputAddress" class="col-sm-2 col-form-label">주소 *</label>
    
    <div class="col-sm-10">
      <div class="row g-3">
           <div class="col">
              <input type="text" class="form-control" v-model="postcode" placeholder="우편번호">
          </div>
           <div class="col">
              <input type="button" class="btn btn-primary" @click="execDaumPostcode" value="우편번호 찾기">
          </div>      
      </div>
      <input type="text" class="form-control" id="inputAddress" v-model="inputAddress">
      <input type="text" class="form-control" id="inputAddress" v-model="extraAddress" placeholder="상세주소를 입력하세요.">
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


export default {
  data() {
    return {
      idcheckResult : '*',
      idCheck:false,
      checkPass:false,
      passcheckResult:'*',
      nameCheck:'',
      addressCheck:'',
      visible: false,
      popupbody:'',
      postcode: "",
      extraAddress: "",
      inputAddress :"",
    }
  },
  components: {
    WindowPopup 
  },

  methods: {
        checkIDvaled() {
          if (!this.inputId) {
             this.idcheckResult = "이메일은 필수입니다.";
          } else if (!this.validEmail(this.inputId)) {
             this.idcheckResult = "이메일 형식을 확인하세요.";
          } else {
            this.idcheckResult = "사용 가능한 ID 입니다."
        //     SignUpApi.idValidation(this.inputId).then(res => {
        //     if (res.data.statusCode === 200) {
        //       if (res.data.data) {
        //         this.idcheckResult = "사용 가능한 ID 입니다."
        //         this.idCheck = true;

        //       } else {
        //           this.idcheckResult = "사용 할수 없는 ID 입니다."
        //           this.idCheck = false;
        //       }

        //     } else {
        //       this.idcheckResult = "사용 할수 없는 ID 입니다."
        //       this.idCheck = false;
        //     }
        // })
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
      onSubmitSignUp(e) {
        e.preventDefault();
        console.log("onSubmitSignUp");
        this.passSHA256();
        console.log("passSHA256");

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
            address : "("+this.postcode+")" +this.inputAddress + this.extraAddress,
          }
          console.log(JSON.stringify(body));
          
          const bodyForm = new FormData();
          bodyForm.append('userInfo', JSON.stringify(body));
          SignUpApi.signUp(body);
          
        }
      },

      handleClickButton() {
      this.visible = !this.visible;
    },
    passSHA256() {
      var cipherText = CryptoJS.AES.encrypt(
          "my message",
            "secretkey123"
          ).toString();
        console.log(cipherText);
    },

    execDaumPostcode() {
       new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.inputAddress = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.inputAddress = data.jibunAddress;
          }

          console.log(this.inputAddress);
 
           // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
          console.log(data.zonecode);
        },
      }).open();
    },
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
        font-size: 12px;
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