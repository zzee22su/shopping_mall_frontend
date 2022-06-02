<template>
  <div class="mypage">
    <h1>This is an mypage</h1>
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