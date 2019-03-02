import AbstractService from './AbstractService';
import root from '../../.api_root';
import { sha256 } from 'js-sha256';

class UserService extends AbstractService {

    logIn(options) {
        options.password = sha256(options.password);
        options.password = sha256(options.password);
        return this.request({
            method: 'GET',
            url:  root.REACT_APP_API_ROOT + 'users/login?login=' + options.user + '&password=' + options.password,
        }).then(responseData => {
            if (responseData.ok) {
                return responseData.json();
            }
            throw responseData;
        });
    }
}

export default new UserService();