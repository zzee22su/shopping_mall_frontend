import Axios from 'axios';
//import store from '../plugins/store';
import LoginApi from './LoginApi';


class HttpClient {
  static instance;
  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: "http://localhost:8080/",
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    //this.axiosInstance.interceptors.request.use((request) =>this.requestHandler(request));
    this.axiosInstance.interceptors.response.use(response => this.responseHandler(response),
      async error => {
        console.log("error.response.status " + error.response.status);
          if (error.response && (error.response.status === 400) && (error.response.data.message === "토큰이 만료되었습니다.")) {
            if(sessionStorage.getItem('accessToken')) {
              this.refreshtoken();
            }
        } else {
          sessionStorage.clear();
          location.replace('/');
        }
        throw error;
      });
 }

 async refreshtoken() {
    console.log("refreshtoken");
    const tocken = await LoginApi.refreshToken();
    console.log("tocken.response.status" + tocken.response.status);
    if (tocken.response && (tocken.response.status === 400)) {
      if(sessionStorage.getItem('accessToken')) {
        sessionStorage.clear();
        location.replace('/');
      }
    throw tocken;
    } else {
      sessionStorage.setItem("accessToken", this.accessToken);
      sessionStorage.setItem("refreshToken", this.refreshToken);
    }
 }

//  requestHandler = async (request) => {
//    let locale = store.state.language.key;
//    request.headers['Accept-Language'] = locale;
//    return request;
//   };

  responseHandler = async (response) => {
 
    return response;
  };

  static getInstance = () => {
    if ((HttpClient.instance === null) || (HttpClient.instance === undefined) || !(HttpClient.instance instanceof HttpClient)) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance.axiosInstance;
  }
}

export default HttpClient.getInstance();


