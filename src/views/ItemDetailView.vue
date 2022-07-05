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
                            <tr scope="row" v-for="(options, optionsIdx) in itemDetail.productionOptions" :key="optionsIdx">
                                <th scopd="row">{{ options.name }}</th>
                                    <td >
                                        <select @change="selectedOption($event, optionsIdx)">
                                            <option selected disabled value="">{{ defaultMsg }}</option>
                                            <option v-for="(types, typedsIdx) in options.optionType" :key="typedsIdx" :value="typedsIdx" >{{ types.type }} {{ '(+'+types.price+'원)' }}</option>
                                        </select>
                                    </td>
                            </tr>
                            <!-- 옵션 선택 시, 표시 됌. -->
                            <tr v-show="addedOptions!=''" v-for="(option, i) in addedOptions" :key="i+1">
                                <td>{{ itemDetail.name }}<br>
                                    {{ option.type }}
                                </td>
                                <td>
                                    <div class="d-grid gap-2 d-md-block">
                                        <button class="btn btn-light" type="button" @click="minus(addedOptions, i)">-</button>
                                        <span>{{ option.count }}</span>
                                        <button class="btn btn-light" type="button" @click="plus(addedOptions, i)">+</button>
                                    </div>
                                </td>
                                <td>{{ (itemDetail.price + option.price) * option.count}}</td>
                                <button class="btn btn-light" type="button" @click="remove(i)">X</button>
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
            totalPrice: 0,
            addedOptions: [],
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

                for(let i=0; i<this.itemDetail.productionOptions.length; i++) {
                    for(let j=0; j<this.itemDetail.productionOptions[i].optionType.length; j++) {
                       this.itemDetail.productionOptions[i].optionType[j].count=1;
                    }
                }
            }
        },

        selectedOption(event, optionsIdx) {
            let typesIdx = event.target.value;
            const data = this.itemDetail.productionOptions[optionsIdx].optionType[typesIdx];
        
            if(this.addedOptions.find((item) => item.type === data.type)){
               alert('이미 추가한 상품입니다.');
            } else {
                this.addedOptions.push(data);
            }
            this.updateTotalPrice();
        },

        minus(addedOptions, idx) {
            const temp = addedOptions[idx];
            let userCount = temp.count;
            if(userCount>1) {
                userCount--;
                this.$delete(temp, 'count');
                this.$set(addedOptions[idx], 'count', userCount);
            }   
            this.updateTotalPrice();  
        }, 

        plus(addedOptions, idx) {
            const temp = addedOptions[idx];
            let userCount = temp.count;

            if(userCount < 10) {
                userCount++;
                this.$delete(temp, 'count');
                this.$set(addedOptions[idx], 'count', userCount);
            } else {
                alert('주문 가능한 개수를 초과하였습니다.');
            }

            this.updateTotalPrice();
        },

        remove(IdxOfaddedOptions) {
            this.addedOptions.pop(IdxOfaddedOptions);
            this.updateTotalPrice();
        }, 

        updateTotalPrice() {
            this.totalPrice = 0;
            let tempPrice = 0;

            for(let i=0; i<this.addedOptions.length; i++) {
                tempPrice += (this.itemDetail.price + this.addedOptions[i].price) * this.addedOptions[i].count;
            } 
            this.totalPrice = tempPrice;
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