import TYPES from '../actions/types';

const INITIAL_STATE = {
    token: '',
    loginLoading: false,
    error: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.TRIGGER_LOGIN_LOADING:
            return { ...state, loginLoading: true };
        case TYPES.CONNECT_SUCCESS:
            return { ...state, token: action.payload, loginLoading: false };
        case TYPES.CONNECT_FAILURE:
            return { ...state, error: true, loginLoading: false };
        case TYPES.DISABLE_ERROR:
            return { ...state, error: false };
        default:
            return state;
    }
};