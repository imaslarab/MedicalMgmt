import URLS from '../constants/urls';

class HttpService {
    handleResponse(xhr, callbackSuccess, callbackError=null) {
        xhr.onloadend = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    callbackSuccess(response);
                } else if (xhr.status === 400) {
                    alert ("unable to process request");
                }
            } else {
                callbackError();
            }
        }
    }

    async get(path, callback) {
        let xhr = new XMLHttpRequest();
        const url = URLS.API_URL + path;

        xhr.open("GET", url, true);
        xhr.send();
        this.handleResponse(xhr, callback);

        return xhr;
    }

    async post(path, data, callback) {
        let xhr = new XMLHttpRequest();
        const url = URLS.API_URL + path;

        var js = JSON.stringify(data);
        xhr.open("POST", url, true);
        xhr.send(js);

        this.handleResponse(xhr, callback);

        return xhr;
    }

    async uploadRequestForS3(url, data, callback) {
        let xhr = new XMLHttpRequest();

        var js = data;
        xhr.open("PUT", url, true);
        xhr.send(js);

        xhr.onloadend = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = xhr.responseURL;
                    callback(response);
                } else if (xhr.status === 400) {
                    alert ("unable to process request");
                }
            } else {
                alert ("unable to process request");
            }
        }

        return xhr;
    }
}

const httpService = new HttpService();
export default httpService;