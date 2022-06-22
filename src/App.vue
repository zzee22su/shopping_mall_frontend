<template>
  <div id="app">
    <Navigation/>
    <div class="contents">

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: { 
    Navigation 
    },

  data() {
    return {
    isLogin : false,
    userName : '',
    }
  },
   methods: {
      
   }  
    

}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  color: #2c3e50;
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

.contents {
  padding-top: 75px; 
  /* nav 높이 보다 커야 title이 보임. */
}
</style>
