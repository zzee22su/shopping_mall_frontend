<template>
<div>

</div>
</template>

<script>
import loginApi from '@/api/LoginApi';
export default {

    created(){
        console.log("created");  // data 접근 가능 
        this.logout();
    },



methods: {
    async logout() {
      const bodyForm = new FormData();
      bodyForm.append('accessToken',sessionStorage.getItem("accessToken"));
      let response = await loginApi.logout(bodyForm);
      sessionStorage.clear();
      if (response.status === 200) {
        this.$router.replace('home');
        location.replace('/');
      }
    },
  }
}
</script>
