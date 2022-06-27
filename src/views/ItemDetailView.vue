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
                                <td>{{ itemDetail.price+'원' }}</td>
                            </tr>
                            <tr>
                                <th scope="row">배송비</th>
                                <td>{{ itemDetail.deliveryCost+'원' }}</td>
                            </tr>
                            <tr scope="row" v-for="options in itemDetail.productionOptions" :key="options.index">
                                <th scopd="row">{{ options.name }}</th>
                                    <td >
                                        <select v-model="selected"  @change="selectedOption">
                                            <option disabled value="">{{ defaultMsg }}</option>
                                            <option v-for="types in options.optionType" :key="types.index" :value="types.type" >{{ types.type }} {{ '(+'+types.price+'원)' }}</option>
                                        </select>
                                    </td>
                            </tr>
                            <!-- 옵션 선택 시, 표시 됌. -->
                            <tr>
                                <td>{{ itemDetail.name }}<br>
                                    {{ selected }}
                                </td>
                                <td>
                                    <div class="d-grid gap-2 d-md-block">
                                        <button class="btn btn-light" type="button" @click="minus">-</button>
                                        <button class="btn btn-light" type="button">{{ count }}</button>
                                        <button class="btn btn-light" type="button" @click="plus">+</button>
                                    </div>
                                </td>
                                 <td>18,000원</td>
                            </tr>
                            <tr>
                                <th scope="row">합계</th>
                                <td>{{ totalPrice }}</td>
                            </tr>
                        </tbody>
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
        console.log('data()');
        return {
            itemDetail: {
                name: '', //상품명
                price: '', //가격
                deliveryCost: '', //배송비
                point: '', //적립금
                productionOptions: [] //상품옵션
            },
            defaultMsg:'[필수] 옵션을 선택해주세요.',
            isRequiredOption: false,
            totalPrice: 0,
            selected: '',
            count: 1
        }
    },

    created() {
        console.log('created');
        this.getProductDetail(this.$route.params.itemId);
    },

    mounted() {
         console.log('mounted'); 
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
                this.itemDetail.productionOptions = itemData.productionOptions;
                console.log(itemData);
            }
        },

        selectedOption(event) {
            console.log("옵션 값 : "+JSON.stringify(event.target));
            if(event.target.value != this.defaultMsg) {
                this.isRequiredOption = true;
                this.totalPrice = this.itemDetail.price + parseInt(event.target.value)
                console.log("합계 :"+this.totalPrice);
            }
        },

        minus() {
            if(this.count>1) {
                this.count--;
            }
        }, 

        plus() {
            // 최대 주문 개수는 10개로 제한한다. 
            if(this.count>=10) {
                 alert('최대 주문 개수를 초과하였습니다.'); 
            } else {
                this.count++;
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