const TopRoute = {
    path: ':category',
    components: {
        list: () => import('@/views/CategoryView.vue'),
    } 
  };

const TopDetailRoute = {
  path: 'top/:itemId',
  name: 'item-detail',
  components: {
    list: () => import('@/views/ItemDetailView.vue')
  } 
};

export default {
    path: '/list',
    name: 'item-list',
    component: () => import('@/views/ItemListView'),
    children: [TopRoute, TopDetailRoute]
};

