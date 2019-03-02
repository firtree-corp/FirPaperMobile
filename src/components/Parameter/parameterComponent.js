import * as React from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    withTheme,
} from 'react-native-paper';
import languages from '../../locales/LanguageList';

class Parameter extends React.Component {

    render() {
        return (
            <View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
    },
});


const mapStateToProps = (state) => {
    return {
        sheet: state.character.sheet,
        selected: state.character.selected,
    };
};

export default connect(mapStateToProps, {
})(withTheme(Parameter));