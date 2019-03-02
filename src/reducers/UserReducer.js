import TYPES from '../actions/types';

const INITIAL_STATE = {
    token: '',
    error: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CONNECT_SUCCESS:
            return { ...state, token: action.payload };
        case TYPES.CONNECT_FAILURE:
            return { ...state, error: true };
        case TYPES.DISABLE_ERROR:
            return { ...state, error: false };
        default:
            return state;
    }
};