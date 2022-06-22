import httpClient from './httpClient';
export default {
    config:{
      header: {
        'Content-Type': '/form-data'
      },
    },
 
  // 상품 등록.
  saveProduct: (bodyForm) => {
     console.log("saveProduct ");
     const config = {headers : {'Content-Type': '/form-data'} };
     return httpClient.post(`api/v1/product`, bodyForm, config); 
  },

   // 상품 내용 가져오기
    getProduct: (productID) => {
    console.log("getProduct ");
    return httpClient.get(`api/v1/product/${productID}`); 
 },
   // 상품 리스트 가져오기
  getProductList:(pageNo, pageSize) => {
    console.log("getProduct List page No " + pageNo + "pageSize " + pageSize);
      return httpClient.get( `api/v1/product?pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  // 상품 이미지 가져오기
  getProductImage:(id) => {
    console.log("getProductImage " + id );
      return httpClient.get( `api/v1/img/${id}`)
  }

 }
 