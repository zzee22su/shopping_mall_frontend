const MyPag = {
    path: 'userInfo',
    Name: 'userInfo',
    components: {
        myInfo: () => import('@/views/mypage/UserInfoView'),
    },
  };

  const ShoppingInfo = {
    path: 'shppingInfo',
    Name: 'shppingInfo',
    components: {
        myInfo: () => import('@/views/mypage/MyShoppingInfoView'),
    },
  };

  export default {
    path: '/mypage',
    name: 'mypage',
    component: () => import('@/views/MyPageView'),
    children: [MyPag, ShoppingInfo],
  };