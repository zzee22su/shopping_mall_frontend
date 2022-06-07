<template>
  <div id="app">
    <nav>
      <label>{{userName}}</label>
      <router-link to="/signup" v-if = "!isLogin" id="signup">회원가입</router-link> |
      <router-link to="/login"  v-if = "!isLogin" id="login">로그인</router-link> 
       <router-link to="/logout" v-if = "isLogin" id="logout">로그아웃</router-link> |
      <router-link to="/mypage">마이쇼핑</router-link> |
      <router-link to="/cart">장바구니</router-link>
    </nav>
    <div id = "title">
       <router-link to="/" style="text-decoration:none">
         <p>Study Shoping Mall~!</p>
      </router-link>
    </div>
    <Category/>
    <router-view></router-view>
  </div>
</template>

<script>
import loginApi from '@/api/LoginApi';
import Category from '@/components/Category.vue'

export default {
  components: { 
    Category 
    },

    beforeCreate(){
        console.log("beforeCreate"); // data 접근 불가 
    },
    created(){
        console.log("created");  // data 접근 가능 
    },

    beforeMount(){
        console.log('beforeMount'); 
    },

    mounted(){
      let token = sessionStorage.getItem("accessToken");
      if (token != null) {
          this.isLogin = true;
      } else  {
        this.isLogin = false;
      }

    },
    
    beforeUpdate(){
        console.log('beforeUpdate'); 
    },
    updated(){
        console.log('updated');
        let token = sessionStorage.getItem("accessToken");
      if (token != null) {
          this.isLogin = true;
           this.getUserName();
      } else  {
        this.isLogin = false;
      }
      console.log("updated isLogin"  + this.isLogin)
    },
    beforeDestroy(){
        console.log('beforeDestroy'); 
    },
    destroyed(){

        console.log('destroyed'); 
    },   

  data() {
    return {
    isLogin : false,
    userName : '',
    }
  },
   methods: {
      async getUserName() {
      
        let result = await loginApi.getUserInfo();
        console.log(result);
        if (result.status === 200) {
          console.log("Name : " + result.data.data.name)
         this.userName = result.data.data.name;
        } else {
          this.userName = '';
        }
    },
   }  
    

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 30px;
}
#title a.router-link-exact-active {
  color: #2c3e50;
}

#title a {
  font-weight: bold;
  color: #2c3e50;
}

nav {
  text-align: right;
  padding: 30px;
  font-size: 13px;
  height:100px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
