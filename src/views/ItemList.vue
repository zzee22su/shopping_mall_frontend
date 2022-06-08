<template>
  <div>
      {{ $route.params.category }}
      {{ category }}
      <Item v-for="item in items" :item="item"></Item>
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

    

    created() {
        console.log("created");
         console.log("!!!!showList : "+this.showList);
    },

    mounted() {
        console.log("mounted");
        console.log(this.$route.path);
         console.log("!!!!showList : "+this.showList);
    },

    watch: {
        // currentPath(val) {
        //     console.log("!!!watch : "+val);
        // },
        category(currentCategory, lastCategory) {
            console.log("!!!watch category: "+currentCategory, lastCategory);
            if(currentCategory === 'top' || currentCategory === 'bottom' ) {
                console.log("!!!!showList : "+this.showList);
                this.showList = this.items.filter(item => item.category === currentCategory);
            } 
        }
    }
}
</script>

<style>

</style>