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
        <product-option ref="product_option" @saveOption ="saveOptionSet" />
    
        <!-- eslint-disable-next-line vue/no-multiple-template-root-->
    <div id="productContent">
         <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
    </div>
    <div class="col-10">
        <input id="input" type="file" ref="fileInput" class="file-upload-input" @change="fileChange" accept="image/*"  multiple/>
         <!-- 업로드된 리스트 -->
        <div class="file-upload-list" id = "productAddFile">
            <div class="file-upload-list__item" v-for="(file, index) in fileList" :key="index">
                <div class="file-upload-list__item__data">
                <img class="file-upload-list__item__data-thumbnail" :src="file.src">
                <div class="file-upload-list__item__data-name">
                    {{ file.name }}
                </div>
                </div>
                <button class="file-upload-list__item__btn-remove" @click="handleRemove(index)">
                    X
                </button>
            </div>
        </div>
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
               ckfinder: {                // Upload the images to the server using the CKFinder QuickUpload command.
                //uploadUrl: "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
                //바로 업로드 주소를 설정 할 경우 위와 같이 설정한다. 우리 프로젝트에서는 custom uploader를 사용한다.
                // Define the CKFinder configuration (if necessary).
                options: {
                    resourceType: "Images"
                    },
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
            fileList:[],
            imgIDList:[],
            imageID:''          
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
        fileChange(event) {
            const files = event.target.files
            this.addFiles(files)
        },
       async addFiles (files) {
            for(let i = 0; i < files.length; i++) {
                const src = await this.readFiles(files[i])
                files[i].src = src
                this.fileList.push(files[i])
            }
        },
        // FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
         async readFiles (files) {
         return new Promise((resolve) => {
            const reader = new FileReader()
             reader.onload = async (e) => {
                 resolve(e.target.result) 
                }
                reader.readAsDataURL(files)
            })
        },
        handleRemove (index) {
            this.fileList.splice(index, 1)
        },

       async saveOptionSet(option) {
            console.log("saveOption parent....")
            let body =  `{ "name": "${this.productName}",
                "price" : ${this.productPrice},
                "deliveryCost" : ${this.deliveryCost},
                "point" : ${this.point},
                "productionOptions": [${option}],
                "category" : "${this.category}",
                "content" :  ${JSON.stringify(this.editorData)},
                "contentImgList" : ${JSON.stringify(this.imgIDList)}
            }`
            let formData = new FormData();

            formData.append('productInfo', body);
             if (this.fileList.length > 0) {
                 this.fileList.forEach((file) => {
                     console.log("file name " + file.name);
                     formData.append('files',file );
                 });
             }

            let result = await ProductAPI.saveProduct(formData);

            // 상품 저장 한 후 새로고침 하여 데이터 저장.
             if (result.status === 200) {

                 alert("상품이 등록 되었습니다.");
                 console.log("Dialog closed");
                 location.replace('/addShop');
             } else {
                  alert("상품 등록 실패.....");
                 console.log("상품 등록 실패.....")
            }

        },

    },
   
    created() {
        this.index = 0;
    },
    updated() {
        if (this.imageID !== sessionStorage.getItem("imgId")) {
            this.imageID = sessionStorage.getItem("imgId");
            this.imgIDList.push (this.imageID)
            console.log(this.imgIDList);
        }
    }
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
       #productAddFile {
            text-align: left;
       }
</style>