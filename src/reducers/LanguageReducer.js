import TYPES from '../actions/types';

const INITIAL_STATE = {
    language: 'fr',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CHANGE_LANGUAGE:
            return { ...state, language: action.payload };
        default:
            return state;
    }
};