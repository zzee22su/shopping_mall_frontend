import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPageRouter from '../router/MyPageRouter'

Vue.use(VueRouter)


const SignupRoute = {
  path: '/signup',
  name: 'signup',
  component: () => import('@/views/SignUpView'),
};

const LoginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/LoginView'),
};


const CartViewRouter = {
  path: '/cart',
  name: 'cart',
  component: () => import('@/views/CartView'),
};

const AddShopRouter = {
  path:'/addshop',
  name: 'addshop',
  component:() => import('@/views/AddShopView'),
};

const LogOutRouter = {
  path: '/logout',
  name: 'logout',
  component: () => import('@/views/LogoutView'),
};

const RootRoute = {
  path: '/',
  name: 'home',
  component: () => import('@/views/HomeView'),
};

const CategoryRoute = {
  path: '/:category',
  name: 'item-list',
  component: () => import('@/views/ItemListView'),
};

const router = new VueRouter({
  mode: 'history',
  routes: [RootRoute, LoginRouter, MyPageRouter, SignupRoute, CartViewRouter,AddShopRouter, LogOutRouter, CategoryRoute],
});

router.beforeEach(async (to, from, next) => {
  console.log("to : " + to.path);
  console.log("from : " + from.path);
  next();

});

export default router
