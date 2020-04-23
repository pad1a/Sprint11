export default class Api {
    constructor(config) {
        this.config = config;
        this.headers = config.headers;
    }
    getInitialCards() {
        return this._request('/cards', 'GET');
    }

    getUserInfo() {
        return this._request('/users/me', 'GET');
    }

    setUserInfo(name, about) {
        return this._requestPatch('/users/me', 'PATCH', name, about);
    }

    uploadCards(placeName, placeLink){
        return this._requestPost ('/cards', 'POST', placeName, placeLink);
    }

    delCards(cardId){
        return this._requestDel ('/cards/', 'DELETE', cardId);
    }

    _requestPatch(url, method, name, about) {
        return fetch(
            this.config.baseUrl + url,
            {
                method: method,
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._handleResult)
            .catch(this._handleError);
    }

    _requestDel(url, method, cardId) {
        return fetch(
            this.config.baseUrl + url + cardId,
            {
                method: method,
                headers: this.headers,
            })
            .then(this._handleResult)
            .catch(this._handleError);
    }

    _requestPost(url, method, placeName, placeLink) {
        return fetch(
            this.config.baseUrl + url,
            {
                method: method,
                headers: this.headers,
                body: JSON.stringify({
                    name: placeName,
                    link: placeLink
                })
            })
            .then(this._handleResult)
            .catch(this._handleError);
    }

    _request(url) {
        return fetch(this.config.baseUrl + url, this.config)
            .then(this._handleResult)
            .catch(this._handleError);
    }


    _handleResult(res) {
        if (res.ok) {
            return res.json();
        }
    }

    _handleError(e) {
        return {error: e};
    }
}



