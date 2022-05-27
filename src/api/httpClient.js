import Axios from 'axios';
//import store from '../plugins/store';


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
  //   this.axiosInstance.interceptors.request.use((request) =>this.requestHandler(request));
  //   this.axiosInstance.interceptors.response.use(response => this.responseHandler(response),
  //     async error => {
  //       if (error.response && (error.response.status === 401)) {
  //         if(sessionStorage.getItem('accountId')) {
  //           sessionStorage.clear();
  //           //location.replace('/v1/main');
  //         }
  //       }
  //       throw error;
  //     });
 }

 // requestHandler = async (request) => {
   // let locale = store.state.language.key;
   // request.headers['Accept-Language'] = locale;
   // return request;
 //// };

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


