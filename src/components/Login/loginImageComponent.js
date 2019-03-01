import * as React from 'react';
import {
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { withTheme } from 'react-native-paper';

class LoginImage extends React.Component {

    render() {
        const { children } = this.props;

        return (
            <ImageBackground source={require('../../image/loginWallpaper.png')} style={styles.container}>
                {children}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
});

export default (withTheme(LoginImage));