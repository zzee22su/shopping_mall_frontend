<template>
    <div>
        <nav>
            <div class="div-all-category">
                <li><router-link to="/list/all">전체</router-link></li>
                <li><router-link to="/list/storage">수납정리</router-link></li>
                <li><router-link to="/list/table">책상*의자</router-link></li>
                <li><router-link to="/list/bad">침대*프레임</router-link></li>
                <li><router-link to="/list/etc">기타</router-link></li>
            </div>
            <div id = "title">
                 <router-link to="/" style="text-decoration:none">
                    Study Shoping Mall~!
                </router-link>
            </div>
            
            <div class="div-all-basic">
                <li >
                    <label v-if="isLogin">{{userName}}</label>
                </li>
                <li >
                    <router-link to="/signup" v-if="!isLogin" id="signup">회원가입</router-link>
                </li>
                <li>
                    <router-link to="/login" v-if="!isLogin" id="login">로그인</router-link>
                </li>
                <li>
                    <router-link to="/logout" v-if="isLogin" id="logout">로그아웃</router-link>
                </li>
                <li>
                    <router-link to="/mypage">마이쇼핑</router-link>
                </li>
                <li >
                    <router-link to="/cart">장바구니</router-link>
                </li>
                <li>
                    <router-link to="/addshop">상품등록</router-link>
                </li>

            </div>
        </nav>
    </div>
</template>

<script>
    import loginApi from '@/api/LoginApi';
    export default {
        data() {
            return {
                isLogin: false,
                userName: '',             
            }
        },

        mounted(){
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

<style scoped="scoped">
    nav {
        position: fixed;
        left: 0;
        right: 0;
        height: 65px;
        padding: 1rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        background: beige;
        text-align: center;
        z-index: 10;
    }

    li {
        list-style: none;
        display: inline;
        margin: 5px;
        font-size: 15px;
    }

    .div-all-category {
        margin: 5% auto;
        
    }

    a {
        /* HTML에선 router-link를 a 태그로 인식한다. */
        text-decoration: none;
    }

#title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1186fb;
  font-size: 30px;
  margin:  5% auto;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>