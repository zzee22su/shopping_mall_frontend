<template>
<div class="container">
    <div class="row">
        <div class="col-sm-3 col-md-3">
            <img class="default" src="../assets/logo.png" alt="../assets/logo.png">
        </div>
        <div class="col-sm-3 col-md-3"> 
            <h2>상품명</h2>
            <table class="table table-borderless">
                <tbody>         
                    <tr>
                    <th scope="row">상품가</th>
                    <td>18,000원</td>
                    </tr>
                    <tr>
                    <th scope="row">무료</th>
                    <td>Jacob</td>
                    </tr>
                    <tr>
                    <th scope="row">옵션</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                        <option selected>필수</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">합계</th>
                    <td>18,000원</td>
                    </tr>
                </tbody>
                <div class="div-option">
                    <!-- 옵션 선택 시, 표시 됌. -->
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                            <th scope="row">상품이름표기</th>
                            <td>18,000원</td>
                            </tr>
                            <tr>
                            <th scope="row">수량표시</th>
                            <td>
                                <div class="d-grid gap-2 d-md-block">
                                    <button class="btn btn-light" type="button">-</button>
                                    <button class="btn btn-light" type="button">숫자표시</button>
                                    <button class="btn btn-light" type="button">+</button>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">가격표시</th>
                            <td>18,000원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button">바로구매</button>
                </div>
                <button type="button" class="btn btn-primary btn-lg">장바구니</button>
                <button type="button" class="btn btn-primary btn-lg">찜</button>
            </table>
        </div>
    </div>
</div>
<!-- TODO : api 쏴서 받아온 아이템 정보들을 표출해야 함  -->
</template>

<script>
import ProductAPI from '@/api/ProductAPI';
export default {
    name: 'item-detail',
    data() {
        return {
            itemDetail:'',
        }
    },

    created() {
        console.log("상세페이지 : "+this.$route.params.itemId);
        this.getProductDetail(this.$route.params.itemId);
    },

   methods: {
        async getProductDetail (id) {
            this.itemDetail = await ProductAPI.getProduct(id);
            console.log(JSON.stringify(this.itemDetail.data));

        }
    }
}
</script>

<style scoped>

.row {
    display: flex;
    justify-content: center;
}
</style>