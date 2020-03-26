import httpService from '../services/HttpService';

class CardApi {
    static listAllCards(callback) {
        let url = `/cards`;

        return httpService.get(url, callback);
    }


    static getImagesFromS3(callback) {
        let url = `/images`;

        return httpService.get(url, callback);
    }

    static addCard(card, callback) {
        let url = `/card`;

        return httpService.post(url, card, callback);
    }

    static duplicateCard(cardId, data, callback) {
        let url = `/card/${cardId}/duplicate`;

        return httpService.post(url, data, callback);
    }

    static deleteCard(cardId, callback) {
        let url = `/card/${cardId}/delete`;
        let data = {
            cardId
        };

        return httpService.post(url, data, callback);
    }

}

export default CardApi;