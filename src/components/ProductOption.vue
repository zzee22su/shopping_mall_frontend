<template>
<div>
      <div class="row mb-3" v-for="(item, index) in optionList" :key="index">
        <label class="col-sm-1 col-form-label">옵션명</label>
        <div class="col-sm-3">
            <input type="text" class="form-control" id="optionTitle" v-model = "item.otpionName">
        </div>

        <div class="col-sm-3">
            <button type="button" class="btn btn-light" @click="adddetailOption">옵션 내용추가하기(ADD)</button>
        </div>
         <div class="col-sm-1">
            <button type="button" class="btn btn-light"  @click="deletedetailOption(index)">옵션삭제하기(X)</button>
        </div>
      </div>
      <div   class="row mb-10" v-for="(subItem, subindex) in suboptionList" :key="subindex+'l'" id="subOption">
            <label  class="col-sm-2 col-form-label">옵션내용</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" id="optionValue" v-model = "subItem.value" >
            </div>
            <label  class="col-sm-2 col-form-label">옵션가격</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" id="optionPrice" v-model = "subItem.price" >
            </div>
            <div class="col-sm-1">
                <button type="button" class="btn btn-light" @click="deletedetailOption2(subindex)">X</button>
            </div>
     </div>
     <div class="col-10">
        <button type="button" class="btn btn-primary" @click="onAddOption" v-if="index === 0">옵션 추가하기</button>
     </div>
    </div>
   
</template>

<script>
export default {
    data() {
        return {
            index:0,
            subindex:0,
            optionList:[],
            suboptionList:[],
            suboptionsave:[],
            otpionName:'',
            value:'',
            price:'',

        }
    },
    methods : {
        adddetailOption() {
            console.log("add detail option....");
            this.subindex = this.suboptionList.length;
            console.log(typeof(this.subindex) +  this.subindex);
            this.suboptionList.push({
                key: this.subindex,
                value: this.value,
                price: this.price,
            });
        },        
        onAddOption() {
            console.log("onAddOption");
            this.index = +1;
            this.optionList.push({
                key: this.index,
                otpionName:this.otpionName,
            });
             console.log(this.optionList);
        },


        deletedetailOption (index) {
            console.log(index);
            this.optionList.splice(index, 1);
            this.suboptionList.splice(0, this.suboptionList.length);
            console.log(this.optionList);
            this.index = 0;
            this.subindex = 0;
        },

        deletedetailOption2 (subindex) {
            console.log("subindex" + subindex);
            this.suboptionList.splice(subindex, 1);
            console.log(this.suboptionList);
        },

        saveOption() {
            console.log("saveOption   ---- ");
            this.suboptionList.forEach(suboptionList => {
                this.suboptionsave.push({value : suboptionList.value, price : suboptionList.price})
            });

            console.log(JSON.stringify( this.suboptionsave));


            let name = '';
            this.optionList.forEach(optionList => {
                name =  optionList.otpionName;
            })
            let body ;
             body =  `{
                "name": "${name}",
                "optionValues": ${JSON.stringify( this.suboptionsave)}
            }` 
            console.log(body);
            this.$emit('saveOption',body);
        },
    
    }
}

</script>
<style>
#subOption {
    margin-left: 150px;
}

</style>