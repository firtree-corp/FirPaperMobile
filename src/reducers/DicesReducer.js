import TYPES from '../actions/types';

const INITIAL_STATE = {
    initialized: false,
    value: 0,
    type: 100,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.THROW_DICES:
            return { ...state, value: action.payload, initialized: true };
        case TYPES.CHANGE_DICES_TYPE:
            return { ...state, type: action.payload };
        default:
            return state;
    }
};