import TYPES from '../actions/types';
import color from 'color';
import fonts from '../../styles/fonts'
import Color from '../../styles/colors'

const white = '#FFFFFF';
const black = '#000000';

const INITIAL_STATE = {
    theme: {
        dark: false,
        roundness: 4,
        colors: {
            primary: Color[0][0],
            accent: Color[1][0],
            background: Color[2][0],
            surface: white,
            error: '#B82601',
            text: black,
            disabled: color(black)
                .alpha(0.26)
                .rgb()
                .string(),
            placeholder: color(black)
                .alpha(0.54)
                .rgb()
                .string(),
            backdrop: color(black)
                .alpha(0.5)
                .rgb()
                .string(),
            notification: '#813772',
        },
        fonts,
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CHANGE_THEME:
            let tmp = {...state.theme};
            tmp.colors[action.payload.key] = action.payload.value;
            return { ...state, theme: tmp };
        default:
            return state;
    }
};