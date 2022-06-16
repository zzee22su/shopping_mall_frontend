const ItemDetail = {
    path: ':id',
    name: 'item-detail',
    component: () => import('@/views/ItemDetailView')
};

export default {
    path: '/:category',
    name: 'item-list',
    component: () => import('@/views/ItemListView'),
    children: [ItemDetail]
};