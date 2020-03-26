import httpService from '../services/HttpService';

class PageApi {
    static listAllPages(cardId, callback) {
        let url = `/card/${cardId}/pages`;

        return httpService.get(url, callback);
    }

}

export default PageApi;