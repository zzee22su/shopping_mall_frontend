<template>
  <div>
    <div class="row">
        <div class="col-sm-3 col-md-3">
            <div class="thumbnail">
                <img src="../assets/logo.png" alt="../assets/logo.png">
                <h4>{{ item.title }}</h4>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default" @click="addWishList">
                        <img src="../assets/premium-icon-heart-2589175.png" alt="../assets/logo.png">
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }

    },

    data() {
        return {
            name : 'Item'
        }
    },
    methods: {
        addWishList() {
            //TODO : (로그인X) 찜 클릭 시, '로그인이 필요합니다. 로그인 하시겠습니까?' alert 창 띄우기
            alert('로그인이 필요합니다. 로그인 하시겠습니까?'); 
        }
    }

}
</script>

<style>

</style>