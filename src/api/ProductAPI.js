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
  getProductList:(pageNo, pageSize, category) => {
    console.log("getProduct List page No " + pageNo + "pageSize " + pageSize);
      return httpClient.get( `api/v1/product?pageNo=${pageNo}&pageSize=${pageSize}&category=${category}`)
  },

     // 상품 리스트 가져오기
     getProductListAll:(pageNo, pageSize) => {
      console.log("getProduct List page No " + pageNo + "pageSize " + pageSize);
        return httpClient.get( `api/v1/product?pageNo=${pageNo}&pageSize=${pageSize}`)
    },
  // 상품 이미지 가져오기
  getProductImage:(id) => {
    console.log("getProductImage " + id );
      return httpClient.get( `api/v1/img/${id}`)
  },

  // 상품 삭제하기
  deleteProduct:(id) => {
    console.log("deleteProduct" + id);
    return httpClient.delete(`api/v1/product/${id}`)
  },

    // 상품 등록 내용 수정하기.
    editProduct: (bodyForm) => {
      console.log("saveProduct ");
      const config = {headers : {'Content-Type': '/form-data'} };
      return httpClient.put(`api/v1/product`, bodyForm, config); 
   },
 }
 