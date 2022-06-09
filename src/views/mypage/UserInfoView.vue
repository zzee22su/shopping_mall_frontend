<template>
<form class="row g-3" id="userInfoEdit">
        <h2>회원 정보 수정</h2>
        <hr />
        <div class="mb-3 row">
            <label for="inputId" class="col-sm-2 col-form-label">ID (email) *</label>
            <div class="col-sm-10">
                <label class="col-sm-2 col-form-label">{{userEmail}}</label>
            </div>
        </div>
        <hr />
        <div class="mb-3 row">
            <label for="inputName" class="col-sm-2 col-form-label">이름 *</label>
            <div class="col-sm-10">
                <label  class="col-sm-2 col-form-label">{{userName}}</label>
            </div>
        </div>
        <hr />
        <div class="mb-3 row">
            <label for="phoneNumber" class="col-sm-2 col-form-label">전화번호 *</label>
            <div class="col-sm-10">
                <input type="text" class="form-control"  id = "phoneNumber" v-model="phoneNumber">
            </div>
        </div>
        <hr />
         <div class="mb-3 row">
            <label for="inputAddress" class="col-sm-2 col-form-label">현재 주소</label>
            <div class="col-sm-10">
                <label id ="addressLabel" class="col-sm-10 col-form-label"> {{nowaddress}}</label>
            </div>
        </div>
        <hr />
     <div class="mb-5 row">
        <label for="inputAddress" class="col-sm-2 col-form-label">주소 *</label>
    
        <div class="col-sm-10">
            <div class="mb-3 row">
                <div class="col-sm-5">
                    <input type="text" class="form-control default" id ="postcode" v-model="postcode" placeholder="우편번호" :disabled = "true" >
                </div>
                <div class="col-sm-5">
                    <button type="button" class="btn btn-primary" @click="execDaumPostcode"> 우편번호 찾기 </button>
                </div>      
            </div>
            <div class="mb-3 row">
                <input type="text" class="form-control default" id ="address"  v-model="address" :disabled = "true">
            </div>
            <div class="mb-3 row">
                <input type="text" class="form-control " id ="extraAddress"  v-model="extraAddress" placeholder="상세주소를 입력하세요.">
            </div>
        </div>
           
    </div>
    <div class="col-12">
            <button type="button" class="btn btn-primary" @click="onUpdateUserInfo">변경내용 저장</button>
    </div>
 
  </form>
</template>


<script>
import loginApi from '@/api/LoginApi';
import AddressUtils from '@/api/AddressUtils';
export default {
    data() {
        return {
            userEmail:'',
            userName:'',
            userPhoneNumber:'',
            userAddress:'',
            nowaddress:'',
            phoneNumber:'',
            postcode:'',
            address:'',
            extraAddress:'',

        }
    },

     created() {
        console.log("created");  // data 접근 가능
        if(sessionStorage.getItem("accessToken")) {
           this.getUserInfo();

        } 
    },

    updated() {
        console.log("updated");
        document.getElementById('phoneNumber').value =   this.phoneNumber;      
    },

    mounted() {
            console.log("mounted"); 
    },

    methods: {
        async getUserInfo() {
            const result = await loginApi.getUserInfo();
             if (result.status === 200) {
                console.log("name : " + result.data.data.name);
                console.log("email : " + result.data.data.email);
                console.log("phoneNumber : " + result.data.data.phoneNumber);
                console.log("address : " + result.data.data.address);

                this.userEmail = result.data.data.email;
                this.userName = result.data.data.name;
                this.phoneNumber =  result.data.data.phoneNumber;

                this.nowaddress = result.data.data.address;
             }
            

        },

        execDaumPostcode() {
            let me = this;
            AddressUtils.getAddress(function(s_addr){                 

                me.postcode = s_addr.postNum; 
                me.address = s_addr.addr;
                me.extraAddress = s_addr.extaddr;
                console.log(s_addr);
            });
        },

        onUpdateUserInfo() {
         // 회원 정보 수정시 업데이트 내용 전달하는 부분 구현 필요.

        }
    }

}
</script>

<style>

    #userInfoEdit {
        width: 800px;
        margin: auto;
      }
    label {
        text-align: left;
        font-size: 15px;
    }
    #addressLabel {
        text-align: left;
        font-size: 15px;
    }

   :disabled {
      cursor: default;    
  }

     
</style>