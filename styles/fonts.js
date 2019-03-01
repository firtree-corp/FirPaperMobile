import { Platform } from 'react-native';

const fonts = Platform.select({
  web: {
    regular: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    medium:
      'Roboto-Medium, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    light:
      'Roboto-Light, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    thin: 'Roboto-Thin, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  ios: { fontFamily: 'Roboto' }, 
  default: { fontFamily: 'Roboto' },
});

export default fonts;