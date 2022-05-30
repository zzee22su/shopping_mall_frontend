import httpClient from './httpClient';
export default {
    config:{
      header: {
        'Content-Type': '/form-data'
      },
    },

  //회원 가입
 signUp: (body) =>{
   return httpClient.post('/api/v1/sign', body);
 },

 // 아이디 중복 체크
 idValidation: (params) => {
    console.log("idValidation " + params);
    return httpClient.get(`/api/v1/sign?email=${params}`);
 },
}
