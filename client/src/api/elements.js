import httpService from '../services/HttpService';

class ElementApi {
    static listAllCards(callback) {
        let url = `/cards`;

        return httpService.get(url, callback);
    }

    static addTextElement(pageId, text, callback) {
        let url = `/page/${pageId}/text`;

        return httpService.post(url, text, callback);
    }

    static editTextElement(pageId, elementId, text, callback) {
        let url = `/page/${pageId}/element/${elementId}/edit/text`;

        return httpService.post(url, text, callback);
    }

    static addImageElement(pageId, image, callback) {
        let url = `/page/${pageId}/image`;

        return httpService.post(url, image, callback);
    }

    static uploadImageToS3(url, file, callback) {
        return httpService.uploadRequestForS3(url, file, callback);
    }

    static editImageElement(pageId, elementId, image, callback) {
        let url = `/page/${pageId}/element/${elementId}/edit/image`;

        return httpService.post(url, image, callback);
    }

    static deleteElement(pageId, elementId, callback) {
        let url = `/page/${pageId}/element/${elementId}/delete`;
        let data = {
            pageId,
            elementId
        };

        return httpService.post(url, data, callback);
    }

}

export default ElementApi;