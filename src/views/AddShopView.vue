<template>

<form class="row g-3 " id = 'shopadd'>
    <div class="mb-3">
        <label id = 'producttitle'>Title을 입력하세요.</label>
        <input type="text" class="form-control" id="form-title" placeholder="title...." v-model="productName">
    </div>
    <div class="row mb-3">
        <label class="col-sm-1 col-form-label">가격</label>
        <div class="col-sm-3">
            <input type="text" class="form-control" id="productPrice" v-model="productPrice">
        </div>
        <label  class="col-sm-1 col-form-label">배송비</label>
        <div class="col-sm-3">
            <input type="text" class="form-control" id="deliveryCost" v-model ="deliveryCost">
        </div>
        <label  class="col-sm-1 col-form-label">적립금</label>
        <div class="col-sm-3">
            <input type="text" class="form-control" id="point" v-model="point">
        </div>
    </div>
        <product-option        
        ref="product_option"
        @saveOption ="saveOp" />
    
        <!-- eslint-disable-next-line vue/no-multiple-template-root-->
    <div id="productContent">
        <ckeditor v-model="editorData" :config="editorConfig"> </ckeditor>
    </div>
    <div class="col-10">
        <button type="button" class="btn btn-primary" @click="onAddProduct">상품등록하기</button>
    </div>
</form>
</template>

<script>
import ProductOption from '../components/ProductOption.vue';
export default {


name: 'productContent',
    data() {
        return {
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            optionList:[],
            index: 0,
            productPrice:'',
            deliveryCost:'',
            point:'',
            productName:'',
            saveOption:''
        };
    },
    components : {
        ProductOption,
    },
    methods :{
        
        onAddProduct() {
            console.log("상품등록하기~!");
            this.$refs.product_option.saveOption();
        },
        saveOp(option) {
            console.log("saveOption parent....")
            let body =  `{ "name": ${this.productName},
                "price" : ${this.productPrice},
                "deliveryCost" : ${this.deliveryCost},
                "point" : ${this.point},
                "productionOption": ${option},
                "content" :  ${this.editorData}
            }`
           console.log(body);

        },
    },
   
    created() {
        this.index = 0;
    },

}
</script>

<style>
 #shopadd {
        width: 700px;
        margin: auto;
      }

      #producttitle {
        width: 700px;
        text-align: left;
        font-size:15px;
      }
      .label{
           text-align: center;
      }
</style>