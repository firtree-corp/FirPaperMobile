import TYPES from '../actions/types';

const INITIAL_STATE = {
    connected: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CONNECT:
            return { ...state, connected: true };
        default:
            return state;
    }
};