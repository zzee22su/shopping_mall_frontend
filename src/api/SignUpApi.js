//
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
 // function idValidation(params) {
   //   console.log("idValidation " + params);
//return true;
    //return httpClient.get(getUrlParams('/v1/signUp/idValidation', params));
 // }

    // 이메일 중복 체크
    // idValidation: (email) => {
    //     console.log("idValidation " + email);
    //     return httpClient.get(`/v1/signUp/emailValidation?email=${email}`);
    //   },
}
