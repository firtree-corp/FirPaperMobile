import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB, Colors } from 'react-native-paper';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import Color from '../../styles/colors';
import {
    themeChange,
} from '../actions';

class Theme extends React.Component {

    handleThemeChange = (colorType, color) => {
        const { themeChange } = this.props;
        const nameTab = ['primary', 'accent', 'background'];

        themeChange(nameTab[colorType], color);
    };

    render() {
        const { theme } = this.props;
        const themeTab = [theme.colors.primary, theme.colors.accent, theme.colors.background];
        console.log(theme);

        return (
            <View style={styles.container}>
                {themeTab.map((value, key) => {
                    return (
                        <View key={key} style={{ ...styles.themeContainer, backgroundColor: value }}>
                            {Color[key].map((color, keyC) => {
                                return (
                                    <FAB
                                        small
                                        key={keyC}
                                        style={{ backgroundColor: color }}
                                        icon="invert-colors"
                                        onPress={() => this.handleThemeChange(key, color)}
                                    />
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    themeContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '33.333%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
});

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
    };
};

export default connect(mapStateToProps, {
    themeChange,
})(withTheme(Theme));