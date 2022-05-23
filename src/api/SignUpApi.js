//
import httpClient from './httpClient';
export default {
    config:{
      header: {
        'Content-Type': '/form-data'
      },
    },
//export default function SignUpApi() {
  // 회원 가입
 // function signUp(body) {
 //     return true;
 //   return httpClient.post('/v1/signUp/user', body);
 // }

  // 아이디 중복 체크
 // function idValidation(params) {
   //   console.log("idValidation " + params);
//return true;
    //return httpClient.get(getUrlParams('/v1/signUp/idValidation', params));
 // }

    // 이메일 중복 체크
    idValidation: (id) => {
        console.log("idValidation " + id);
        return httpClient.get(`${process.env.VUE_APP_API_HOST_URL}/v1/signUp/idValidation?id=${id}`);
      },
    }
