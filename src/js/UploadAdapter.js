export default class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then( file => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners( resolve, reject);
            this._sendRequest( file );
        })))
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/api/v1/img', true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const genericErrorText = '파일을 업로드 할 수 없습니다.'


        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if(!response || response.error) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }
            console.log(response);
            let imageFileSrc = response.data.path;
            let imageId =  response.data.imgId;
            console.log("imageFileSrc: " + imageFileSrc +", imgId : " + imageId)
            sessionStorage.setItem("imgId", imageId);
            resolve({
                default: imageFileSrc //업로드된 파일 주소
            })
        })
    }

    _sendRequest(file) {
        const data = new FormData()
        data.append('file', file);
        this.xhr.send(data)
    }
}