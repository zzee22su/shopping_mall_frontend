<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-3">
                <img class="default" src="../assets/logo.png" alt="../assets/logo.png"></div>
                <div class="col-sm-3 col-md-3">
                    <h2>{{ itemDetail.name }}</h2>
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <th scope="row">상품가</th>
                                <td>{{ itemDetail.price }}</td>
                            </tr>
                            <tr>
                                <th scope="row">배송비</th>
                                <td>{{ itemDetail.deliveryCost }}</td>
                            </tr>
                            <tr>
                                <th scope="row">옵션</th>
                                <div v-for="option in itemDetail.options" :key="option.index">
                                    <td>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected="selected">옵션을 선택해주세요.</option>
                                            <option :value="option.index">{{ option.name }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-select" aria-label="Default select example">
                                            <option 
                                                v-for="types in option.optionType" 
                                                :key="types.index" 
                                                :value="types.index">
                                                {{ types.type }}
                                            </option>
                                        </select>
                                    </td>
                                </div>
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
    </template>

    <script>
        import ProductAPI from '@/api/ProductAPI';
        export default {
            name: 'item-detail',
            data() {
                return {
                    itemDetail: {
                        name: '', //상품명
                        price: '', //가격
                        deliveryCost: '', //배송비
                        point: '', //적립금
                        options: [] //상품옵션
                    }
                }
            },

            created() {
                this.getProductDetail(this.$route.params.itemId);
            },

            methods: {
                async getProductDetail(id) {
                    let response = await ProductAPI.getProduct(id);
                    if (response.data.status === 200) {
                        const itemData = response.data.data;
                        this.itemDetail.name = itemData.name;
                        this.itemDetail.price = itemData.price;
                        this.itemDetail.deliveryCost = itemData.deliveryCost;
                        this.itemDetail.point = itemData.point;
                        this.itemDetail.options = itemData.productionOptions;
                    }
                }
            }
        }
    </script>

    <style scoped="scoped">

        .row {
            display: flex;
            justify-content: center;
        }
    </style>