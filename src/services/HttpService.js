import Ajax from './Ajax';

class HttpService {

    request(options) {
        return Ajax.call(options);
    }
}

export default new HttpService();
