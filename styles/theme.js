import fonts from './fonts';
import color from 'color';

const white = '#FFFFFF';
const black = '#000000';

const theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#062F4F',
        accent: '#3a587b',
        background: '#FFFFFF',
        surface: white,
        error: '#b71c1c',
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

export default theme;