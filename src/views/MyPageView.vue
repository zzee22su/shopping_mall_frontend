<template>
<div>
 <div  height="100%" id = "leftBar" border-right:1px>
    <div>
      <label> <router-link to="/mypage/userInfo"  id="userInfoEdif">회원정보 수정</router-link> </label>
    </div>
    <div>
      <label> <router-link to="/mypage/shppingInfo"  id="userInfoEdif">주문내역 조회</router-link> </label>
    </div>             
    <div>
      <label> <router-link to="/mypage/userInfo"  id="userInfoEdif">비밀번호 변경</router-link> </label>
    </div>              
    <div>
      <label> <router-link to="/logout" id="logout">로그아웃</router-link></label>
    </div>             

  </div>
    <div   id = "rightBar">
      <router-view name="myInfo"> </router-view>
    </div>
  </div>
</template>


<script>
export default {


    data() {
      return {

      }
    },

   created(){
        console.log("created");  // data 접근 가능
        if(!sessionStorage.getItem("accessToken")) {
          sessionStorage.setItem('mypage', 'mypage');
          this.$router.replace('login');    
        }
    },

    methods:{

    },
}
</script>
<style  scoped="scoped">
  #leftBar {
    align-content: left;    
    height : 100vh;
    border-right:1px
    solid rgb(8, 16, 248);
    font:black;
    padding-left: 100px;
    float: left; 
    width: 20%;
    
    
  }
  #rightBar {
    float: left; 
    width: 80%;
  }
    label a {
        text-decoration: none;
        color: #000000;
        font:black;
        font-size: 20px;
        text-align: left;
        font-weight: bold;
        padding: 15px;
    }
    label a.router-link-exact-active {
     color: #010a6c;
    }

</style>
