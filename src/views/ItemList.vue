<template>
  <div>
      <Item v-for="item in showList" :item="item"></Item>
      <!-- :item="item"은 Item.vue에 props를 가리킴 -->
  </div>
</template>

<script>

import Item from '@/components/Item.vue'

export default {
    name: 'item-list',
    props: {
        category : {
            type: String
        }
    },

    components: {
        Item
    },

    data() {
        return {
            items: [
                {
                    id: 0,
                    title: 'T-shirt',
                    category: 'top'
                },

                 {
                    id: 1,
                    title: 'shorts',
                    category: 'bottom'
                },

                 {
                    id: 2,
                    title: 'T-shirt',
                    category: 'top'
                },

                {
                    id: 3,
                    title: 'T-shirt',
                    category: 'top'
                }
            ],
            showList: [this.items]
        }
    }, 

    methods: {
        showCategory() {
            const category = this.$route.params.category;
            if(category === 'top' || category === 'bottom') {
                this.showList = this.items.filter(item => item.category === category);
            }
        }
    },

    watch: {
        $route() {
            this.showCategory();
        }
    },

    created() {
        console.log('ItemList created');
        this.showCategory();
    },
}
</script>

<style>

</style>