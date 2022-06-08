<template>
    <div>
        <nav>
            <div class="div-all-category">
                <li @click="clickTop">Top</li>
                <li @click="clickBottom">Bottom</li>
            </div>
            <div class="div-all-basic">
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
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {name: 'Category'}
        },

        methods: {
            clickTop() {
                console.log("!!!clickTop");
                this
                    .$router
                    .push({
                        name: 'item-list',
                        params: {
                            category: 'top'
                        }
                    })
                    .catch(() => {});
            },
            clickBottom() {
                console.log("!!!clickBottom");
                this
                    .$router
                    .push({
                        name: 'item-list',
                        params: {
                            category: 'bottom'
                        }
                    })
                    .catch(() => {});
            }
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
    }

    .div-all-category {
        margin: auto;
    }

    a {
        /* HTML에선 router-link를 a 태그로 인식한다. */
        text-decoration: none;
    }
</style>