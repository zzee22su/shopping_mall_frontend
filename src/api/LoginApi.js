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

 getUserInfo: () =>{
    const config = {headers : {'Authorization': sessionStorage.getItem("accessToken")} };
    return httpClient.get(`/api/v1/user`, config);
  },

  logout:(body) => {
    const config = {headers : {'Content-Type': 'application/x-www-form-urlencoded'} };
    return httpClient.post(`/api/v1/logout`, body, config);
  },
  refreshToken:() => {
    const config = {headers : {'Content-Type': 'application/x-www-form-urlencoded'} };
    const bodyForm = new FormData();
    bodyForm.append('accessToken', JSON.stringify(sessionStorage.getItem("accessToken")));
    bodyForm.append('refreshToken', JSON.stringify(sessionStorage.getItem("refreshToken")));
    return httpClient.post(`/api/v1/logout`, bodyForm, config); 
  }
}