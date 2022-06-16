import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPageRouter from '../router/MyPageRouter'
import ItemRouter from './ItemRouter';

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

// const CategoryRoute = {
//   path: '/:category',
//   name: 'item-list',
//   component: () => import('@/views/ItemListView'),
//   children: [{
//     path: 'id',
//     name: 'item-detail',
//     component: () => import('@/views/ItemDetailView')
//   }]
// };

const router = new VueRouter({
  mode: 'history',
  routes: [RootRoute, LoginRouter, MyPageRouter, SignupRoute, CartViewRouter,AddShopRouter, LogOutRouter, ItemRouter],
});

router.beforeEach(async (to, from, next) => {
  console.log("to : " + to.path);
  console.log("from : " + from.path);
  next();

});

export default router
