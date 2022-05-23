<template>
  <div id="app">
    <nav>
      <router-link to="/signup">회원가입</router-link> |
      <router-link to="/login">로그인</router-link> |
      <router-link to="/mypage">마이쇼핑</router-link> |
      <router-link to="/cart">장바구니</router-link>
    </nav>
    <div id = "title">
       <router-link to="/" style="text-decoration:none">
         <p>Study Shoping Mall~!</p>
      </router-link>
    </div>
    <router-view/>
    
  </div>
</template>

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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
