<template>
  <div id="app">
    <Category/>
    <div class="contents">
      <div id = "title">
        <router-link to="/" style="text-decoration:none">
        <p>Study Shoping Mall~!</p>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Category.vue'

export default {
  components: { 
    Category 
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

.contents {
  padding-top: 75px; 
  /* nav 높이 보다 커야 title이 보임. */
}
</style>
