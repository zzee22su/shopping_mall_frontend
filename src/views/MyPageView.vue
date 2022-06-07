<template>
<div class="row">
 <div class ="col-sm-12">
    <slider
      :width="180"
      format="overlay"
      direction="left"
      :opacity="0.15"
      :links="[
        {'id': 1, 'text': '회원정보 수정', 'url': '/mypage/userInfo'},
        {'id': 2, 'text': '주문내역 조회', 'url': '/mypage/shppingInfo'},
        {'id': 3, 'text': '비밀번호 변경', 'url': '/mypage/userInfo'},
        {'id': 4, 'text': '로그아웃', 'url': '/logout'},
      ]"
    >
    </slider>
    </div>
    <div class ="col-sm-12">
      <router-view name="myInfo"> </router-view>
    </div>
  </div>
</template>


<script>
import Slider from '../components/Slider.vue'
export default {

  components: {
    'slider': Slider
  },
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
<style lang="scss">
  @import '@/assets/sass/app.scss';
</style>
