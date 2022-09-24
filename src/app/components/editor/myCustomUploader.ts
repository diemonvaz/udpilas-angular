import { environment } from "./../../../environments/environment";

export class MyUploadAdapter {
  public loader: any;
  public url: string;
  public xhr: XMLHttpRequest;
  public token: string;

  constructor(loader) {
    this.loader = loader;
    // URL base de subida de imgur
    this.url = `https://api.imgur.com/3/image`;
    // token BEARER para subir a nuestra API. Si ponemos el client ID sube como anonimo
    this.token = 'Bearer c209fe8601a9933fe0abba7fe0fb62f67ccd773a';
  }

  upload() {
    return new Promise(async (resolve, reject) => {
      this.loader.file.then((file) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", this.url, true);
    xhr.setRequestHeader("Authorization", this.token);
    xhr.responseType = "json";
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      } 
      
      resolve({
        default:response.data.link,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file) {
    const data = new FormData();
    data.append("image", file);
    this.xhr.send(data);
  }
}
