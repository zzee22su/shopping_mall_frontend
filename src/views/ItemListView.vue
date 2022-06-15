<template>
  <div class="container">
    <div class="row">
        <div class="col-sm-3 col-md-3"  v-for="item in showList" :key="item.id">
            <div class="thumbnail" @click="gotoDetail(item.id)">
                <img src="../assets/logo.png" alt="../assets/logo.png">
                <h4>{{ item.title }}</h4>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default" @click="addWishList">
                        <img src="../assets/empty_heart.png" alt="../assets/logo.png">
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
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
                },

                {
                    id: 4,
                    title: 'T-shirt',
                    category: 'top'
                },

                {
                    id: 5,
                    title: 'T-shirt',
                    category: 'top'
                },

                {
                    id: 6,
                    title: 'T-shirt',
                    category: 'top'
                },

                {
                    id: 7,
                    title: 'shorts',
                    category: 'top'
                },

                {
                    id: 8,
                    title: 'shorts',
                    category: 'top'
                },

                {
                    id: 9,
                    title: 'shorts',
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
        },

        addWishList() {
            if(!this.isLogin) {
                if(confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
                    location.href="/login"
                } 
            }       
        },

        gotoDetail(id) {
            console.log('상품아이디 : ' +id);
            // location.href='/'+this.category+'/'+id;
            // location.href='/test';       
            this.$router.push({
                // name: 'item-detail',
                path: '/'+this.$route.params.category+'/'+id,
                params: { itemId: id }
            });    
        }
    },

    watch: {
        $route() {
            this.showCategory();
        }
    },

    created() {
        this.showCategory();
    },

    mounted() {
        let token = sessionStorage.getItem("accessToken");
        if (token != null) {
            this.isLogin = true;
        }
    }
}
</script>

<style scopd>

</style>