<template>
  <div>
      <Item v-for="item in items" :item="item"></Item>
      <!-- :item="item"은 Item.vue에 props를 가리킴 -->
      {{ this.items }}
  </div>
</template>

<script>

import Item from '@/components/Item.vue'

export default {
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
                }
            ]
        }
    },


created() {
      console.log("created");
    console.log(this.$route.path);
},

mounted() {
    console.log("mounted");
},

    watch: {
        $route(to) {
            console.log("watch");
            this.items = this.items.filter(item => item.category === to);  
        }
    }
}
</script>

<style>

</style>