import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemList from '@/views/ItemList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ '../views/SignUpView.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
  
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import(/* webpackChunkName: "mypage" */ '../views/MyPageView.vue')
    },
  
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "cart" */ '../views/LogoutView.vue')
    },

    {
      path: '/',
      name: 'item-list',
      component: ItemList
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  console.log("to : " + to.path);
  console.log("from : " + from.path);
  next();

});

export default router
