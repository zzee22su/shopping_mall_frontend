const TopRoute = {
    path: ':category',
    components: {
        list: () => import('@/views/CategoryView.vue'),
    } 
  };

const TopDetailRoute = {
  path: 'all/:itemId',
  name: 'item-detail',
  components: {
    list: () => import('@/views/ItemDetailView.vue')
  } 
};

const ProductEdit = {
  path: 'productEdit/:itemId',
  name: 'item-edit',
  components: {
    list: () => import('@/views/product/EditProductDetail.vue')
  } 
};

export default {
    path: '/list',
    name: 'item-list',
    component: () => import('@/views/ItemListView'),
    children: [TopRoute, TopDetailRoute, ProductEdit]
};

