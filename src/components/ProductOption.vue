<template>
<div class="col-10">
    <div v-for="(item, index) in optionList" :key="index">
      <div class="row mb-3" >
        <label class="col-sm-1 col-form-label">옵션명</label>
        <div class="col-sm-3">
            <input type="text" class="form-control" id="optionTitle" v-model = "item.otpionName">
        </div>

        <div class="col-sm-3">
            <button type="button" class="btn btn-light" @click="adddetailOption(index)">옵션 내용추가하기(ADD)</button>
        </div>
         <div class="col-sm-1">
            <button type="button" class="btn btn-light" @click="deletedetailOption(index)">옵션삭제하기(X)</button>
        </div>
      </div>
        <div   class="row mb-10" v-for="(subItem, subindex) in optionList[index].optionType" :key="subindex+'l'" id="subOption">
                <label  class="col-sm-2 col-form-label">옵션내용</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="optionValue" v-model = "subItem.value" >
                </div>
                <label  class="col-sm-2 col-form-label">옵션가격</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="optionPrice" v-model = "subItem.price" >
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-light" @click="deletedetailOption2(index, subindex)">X</button>
                </div>
        </div>
     </div>
     <div class="col-10">
        <button type="button" class="btn btn-primary" @click="onAddOption">옵션 추가하기</button>
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
            optionsave:[],
            otpionName:'',
            value:' ',
            price:'0',

        }
    },
    methods : {

        adddetailOption(index) {
            console.log("add detail option...." + index);
            this.optionList[index].optionType.push({
                key: this.subindex,
                value: this.value,
                price: this.price,
            });
            this.subindex = this.subindex +1
        },
        
        
        onAddOption() {
            console.log("onAddOption");
            this.optionList.push({
                key: this.index,
                otpionName:this.otpionName,
                optionType:[], 
            });
        this.index = this.index + 1;
             console.log(this.optionList);
        },


        deletedetailOption (index) {
            console.log(index);
            this.optionList.splice(index, 1);
            this.index = 0;
            this.subindex = 0;
        },

        deletedetailOption2 (index, subindex) {
            console.log("subindex" + subindex);
            this.optionList[index].optionType.splice(subindex, 1);
            console.log(this.suboptionList);
        },
        saveOption() {
            console.log("saveOption   ---- ");
            let subOption = [];
            
             this.optionList.forEach((optionList, index, object) => {
                 this.optionList[index].optionType.forEach(suboption => {
                    subOption.push({type : suboption.value, price : suboption.price})
                })
                this.optionsave.push({name : optionList.otpionName, optionValues : subOption})
                subOption = [];
            })


            console.log(JSON.stringify( this.optionsave));
            this.$emit('saveOption',this.optionsave);
        },
    
    }
}

</script>
<style>
#subOption {
    margin-left: 150px;
}

</style>