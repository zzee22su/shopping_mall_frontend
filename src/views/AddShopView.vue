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
        <div class="row mb-3">
            <select  @change="categorySelect($event)" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                <option selected value = "기타">기타</option>
                <option value="수납정리">수납정리</option>
                <option value="책상의자">책상*의자</option>
                <option value="침대*프레임">침대*프레임</option>
            </select>
        </div>
        <product-option        
        ref="product_option"
        @saveOption ="saveOptionSet" />
    
        <!-- eslint-disable-next-line vue/no-multiple-template-root-->
    <div id="productContent">
         <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
    </div>
    <div class="col-10">
        <input id="input" type="file" accept="image/*"  @change="fileChange" ref="file" />
    </div>
    <div class="col-10">
        <button type="button" class="btn btn-primary" @click="onAddProduct">상품등록하기</button>
    </div>
</form>
</template>

<script>
import ProductOption from '../components/ProductOption.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from '../js/UploadAdapter'
import ProductAPI from '../api/ProductAPI';
export default {


name: 'productContent',
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                extraPlugins: [this.MyCustomUploadAdapterPlugin],
               ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command.
                //uploadUrl: "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",

                // Define the CKFinder configuration (if necessary).
                options: {
                    resourceType: "Images"
                },
                //    openerMethod: this.MyCustomUploadAdapterPlugin,
                },
                mediaEmbed: {
                    previewsInData: true
                }
            },
            optionList:[],
            index: 0,
            productPrice:'',
            deliveryCost:'',
            point:'',
            productName:'',
            saveOption:'',
            category:'',
            file_name:'',
            formData:'',
            
        };
    },
    components : {
        ProductOption,
    },
    methods :{
         MyCustomUploadAdapterPlugin(editor) {
             console.log("MyCustomUploadAdapterPlugin");
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader)
            }
        },
        
        onAddProduct() {
            if (!this.productName) {
                alert("제목을 입력 하세요.");
                return;
            } else if (!this.productPrice) {
                alert("가격을 입력 하세요.");
                return;
            } else if (!this.deliveryCost) {
                alert("배송비를 입력 하세요.");
                return;
            } else if (!this.point) {
                alert("적립금을 입력 하세요.");
                return;
            }
            console.log("상품등록하기~!");
            this.$refs.product_option.saveOption();
        },
        categorySelect(event) {
            console.log(event.target.value);
            this.category = event.target.value;
        },
        fileChange() {
            const file = this.$refs.file.files[0];
            console.log(file);
            this.formData = new FormData();
            this.filename = file.name;
            this.formData.append('files', file);
        },

        saveOptionSet(option) {
            console.log("saveOption parent....")
            let body =  `{ "name": "${this.productName}",
                "price" : ${this.productPrice},
                "deliveryCost" : ${this.deliveryCost},
                "point" : ${this.point},
                "productionOptions": [${option}],
                "category" : "${this.category}",
                "content" :  ${JSON.stringify(this.editorData)}
            }`
            if (!this.formData) {
                this.formData = new FormData();
            }
             this.formData.append('productInfo', body);

           console.log(this.formData);
           ProductAPI.saveProduct(this.formData);

            // 상품 저장 한 후 새로고침 하여 데이터 저장.
          // location.replace('/');

        },

    },
   
    created() {
        this.index = 0;
    },

}
</script>

<style>
 #shopadd {
        width: 1000px;
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
      .ck-editor__editable {
    min-height: 600px;
}
</style>