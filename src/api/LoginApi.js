import httpClient from './httpClient';
export default {
    config:{
        header: {
          'Content-Type': '/form-data'
        },
      },


  //로그인
 login: (body) =>{
   return httpClient.post('/api/v1/login', body);
 },

 //UserInfo 가져오기
 getUserInfo: () =>{
    const config = {headers : {'Authorization': sessionStorage.getItem("accessToken")} };
    return httpClient.get(`/api/v1/user`, config);
  },

  //로그 아웃.
  logout:(body) => {
    const config = {headers : {'Content-Type': 'application/x-www-form-urlencoded'} };
    return httpClient.post(`/api/v1/logout`, body, config);
  },

  //토큰 재발급
  refreshToken:() => {
    const config = {headers : {'Content-Type': 'application/x-www-form-urlencoded'} };
    const bodyForm = new FormData();
    bodyForm.append('accessToken', sessionStorage.getItem("accessToken"));
    bodyForm.append('refreshToken',sessionStorage.getItem("refreshToken"));
    return httpClient.post(`api/v1/token/refresh`, bodyForm, config); 
  }
}