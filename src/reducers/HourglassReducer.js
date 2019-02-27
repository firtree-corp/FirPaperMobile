import TYPES from '../actions/types';

const INITIAL_STATE = {
    maxTime: 2000,
    currentTime: 2000,
    running: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.RUN_HOURGLASS:
            return { ...state, running: true };
        default:
            return state;
    }
};