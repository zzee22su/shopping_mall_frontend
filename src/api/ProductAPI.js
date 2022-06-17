import httpClient from './httpClient';
export default {
    config:{
      header: {
        'Content-Type': '/form-data'
      },
    },
 
  // 아이디 중복 체크
  saveProduct: (bodyForm) => {
     console.log("saveProduct ");
     const config = {headers : {'Content-Type': '/form-data'} };
     return httpClient.post(`api/v1/product`, bodyForm, config); 
  },
 }
 