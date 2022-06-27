<template>
<form class="row g-3 " id = 'shopEdit'>
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
        <product-option ref="product_option"  :optionsList="optionList" />
    
        <!-- eslint-disable-next-line vue/no-multiple-template-root-->
    <div id="productContent">
         <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
    </div>
         <!-- 업로드된 리스트 -->
        <div class="file-upload-list" >
            <div class="file-upload-list__item" v-for= "file in fileList" :key="file.id" id = "prodluctAttechfile">
                <div class="file-upload-list__item__data">
                     <img  :src ="imageSrc(file.id)"  width="100" height="100"/>
                    <div class="file-upload-list__item__data-name">
                    {{ file.filename }}
                </div>
                </div>
                <button class="file-upload-list__item__btn-remove" @click="handleRemove(index)">
                    X
                </button>
            </div>
        </div>
    <div class="col-10">
        <input id="input" type="file" ref="fileInput" class="file-upload-input" @change="fileChange" accept="image/*"  multiple/>
         <!-- 업로드된 리스트 -->
        <div class="file-upload-list" id = "productAddFile">
            <div class="file-upload-list__item" v-for="(files, index) in addFileList" :key="index">
                <div class="file-upload-list__item__data">
                <img class="file-upload-list__item__data-thumbnail" :src="files.src">
                <div class="file-upload-list__item__data-name">
                    {{ files.name }}
                </div>
                </div>
                <button class="file-upload-list__item__btn-remove" @click="handleRemoveaddfile(index)">
                    X
                </button>
            </div>
        </div>
    </div>
    <div class="col-10">
        <button type="button" class="btn btn-primary">수정 내용 저장</button>
    </div>
</form>
</template>

<script>
import ProductOption from '../../components/ProductOption.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from '../../js/UploadAdapter'
import ProductAPI from '../../api/ProductAPI';

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
               extraPlugins: [this.MyCustomUploadAdapterPlugin],
               ckfinder: {                // Upload the images to the server using the CKFinder QuickUpload command.
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
            imageID:'',
            productInfo:'' ,
            productID:'',
            imgList:[],
            addFileList:[],
            deleteFileList:[],
        };
    },
    components : {
        ProductOption,
    },
    props : {

    },
     methods :{
         MyCustomUploadAdapterPlugin(editor) {
                console.log("MyCustomUploadAdapterPlugin");
                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new UploadAdapter(loader)
            }
        },
        async getProductInfo(id) {
            console.log("product Id : " + id);
            const result = await ProductAPI.getProduct(id);
            console.log(result);
            if (result.data.status === 200) {
                console.log(JSON.stringify(result.data.data));
                this.productInfo = result.data.data;
                this.productName = this.productInfo.name;
                this.productPrice =  this.productInfo.price;
                this.deliveryCost =  this.productInfo.deliveryCost;
                this.point =  this.productInfo.point;
                this.editorData = this.productInfo.content;
                this.imgList = this.productInfo.imgList;
                this.optionList = this.productInfo.productionOptions;
            }
            this.filterImageList();    
        },
        filterImageList() {
            if(this.imgIDList) {
                this.imgList.forEach(image => {
                    console.log(JSON.stringify(image))
                    console.log("contentImage : " + image.contentImg);
                    if (image.contentImg === 1) {
                        this.imgIDList.push(image)
                    } else {
                        image.src = 
                        this.fileList.push(image);
                        console.log(`/api/v1/img/${image.id}`);
                    }
                });
            }
        },
        imageSrc(id){
            return "/api/v1/img/" + id
        },

        fileChange(event) {
            const files = event.target.files
            this.addFiles(files)
        },
       async addFiles (files) {
            for(let i = 0; i < files.length; i++) {
                const src = await this.readFiles(files[i]);
                files[i].src = src;
                this.addFileList.push(files[i]);
                
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
            this.deleteFileList.push(this.fileList[index]);
            this.fileList.splice(index, 1);
        },
         handleRemoveaddfile (index) {
            this.addFileList.splice(index, 1)
        },
     },

     created () {
        this.productID = this.$route.params.itemId;
        console.log("product Id : " + this.productID);
        this.getProductInfo(this.productID);
     }
}
</script>


<style>
#shopEdit {
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
            height: 600px;
       }
       #productAddFile {
            text-align: left;
       }
       #prodluctAttechfile {
         display: inline;
         float:left;
         margin: 10px;
       }
</style>