import HttpService from './HttpService';

class AbstractService {

    request(options) {
        return HttpService.request(options);
    }

}

export default AbstractService;
