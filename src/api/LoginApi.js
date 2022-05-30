import httpClient from './httpClient';
export default {
    config:{
      header: {
        'Content-Type': '/form-data'
      },
    },

  //회원 가입
 login: (body) =>{
   return httpClient.post('/api/v1/login', body);
 },

 getUserInfo: (header) =>{
    return httpClient.get(`/api/v1/user`, header);
  }
}