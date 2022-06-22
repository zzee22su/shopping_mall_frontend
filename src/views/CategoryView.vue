<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-md-3" v-for="item in showList" :key="item.id">
                    <div class="thumbnail" @click="gotoDetail(item.id)">
                        <img :src="item.image" width="300" height="300" alt="../assets/logo.png" >
                            <h4>{{ item.title }}</h4>
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default" @click="addWishList">
                                <img src="../assets/empty_heart.png" alt="../assets/logo.png"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
                <Pagination
                :pageSetting="pageDataSetting(total, limit, block, this.page)"
                @paging="pagingMethod" />
        </div>
      </div>
</template>

<script>
import ProductAPI from '@/api/ProductAPI';
import Pagination from '../components/Pagination.vue';

export default {
    data() {
        return {
            items: [],
            showList: [this.items],
            productList:[],
            imgsrc:'',
            total: '',
            page: 1,
            limit: 12,
            block: 5
        }
    },
    components : {
        Pagination,
    },

    methods: {
        async getItemList(pageNo, pageSige) {
                this.items = [];
               const response =  await ProductAPI.getProductList(pageNo, pageSige);
               console.log ( JSON.stringify(response.data.data));
               this.productList = response.data.data.productList;
               this.total = response.data.data.totalCount;
               console.log("totalCount " + this.total);
                   this.productList.forEach(product => {
                       this.items.push ({
                           id : product.id,
                           title : product.name,
                           category : 'top',
                           image: "/api/v1/img/" + product.imgList[0],
                           });
                        console.log("item.image.... " + product.imgList[0]);
                        
                   });
                   this.showCategory();

        },
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
            this.detail = true;
            this.$router.push({
                name: 'item-detail',
                params: { itemId: id }
            }).catch(() => {});  
        },

        pagingMethod(page) {
        console.log("pagingMethod " + page);
        // this.listData = this.paymentInfo.slice (
        //   (page - 1) * this.limit,
        //   page * this.limit
        // )
        this.page = page
        console.log("total.." + this.total);
        if (this.total > 0) {
            this.pageDataSetting(this.total, this.limit, this.block, page);
            this.getItemList(page, this.limit);
        }
        
      },
 
      pageDataSetting(total, limit, block, page) {
        const totalPage = Math.ceil(total / limit)
        let currentPage = page
        const first =
          currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
        const end =
          totalPage !== currentPage
            ? parseInt(currentPage, 10) + parseInt(1, 10)
            : null
 
        let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1
        let endIndex =
          startIndex + block > totalPage ? totalPage : startIndex + block - 1
        let list = []
        for (let index = startIndex; index <= endIndex; index++) {
          list.push(index)
        }
        return { first, end, list, currentPage }
      }
    },


    watch: {
        $route() {
            this.showCategory();
        }
    },

    created() {
        this.getItemList(this.page, this.limit);
        this.pagingMethod(this.page);
    },

    mounted() {
        let token = sessionStorage.getItem("accessToken");
        if (token != null) {
            this.isLogin = true;
        }
    }
}
</script>

<style>

</style>